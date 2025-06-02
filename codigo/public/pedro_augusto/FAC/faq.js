// faq.js

// Uso de um IIFE (Immediately Invoked Function Expression) para encapsular o código
// e evitar poluir o escopo global.
(function() {
    // --- Referências aos Elementos do DOM ---
    const DOM = {
        faqListContainer: document.getElementById('faq-list-container'),
        searchInput: document.getElementById('faq-search-input'),
        searchButton: document.getElementById('faq-search-button'),
        faqDisplayTitle: document.getElementById('faq-display-title'),
        faqLoader: document.getElementById('faq-loader')
    };

    // --- Variáveis de Estado ---
    let allFaqData = []; // Armazena todos os dados do FAQ após o carregamento inicial
    const dataFilePath = 'prt.json'; // Caminho para o arquivo JSON

    // --- Funções de Utilitário para UI (Exibição de Loader/Mensagens) ---

    /**
     * Mostra o indicador de carregamento e oculta outros elementos.
     */
    function showLoader() {
        DOM.faqListContainer.innerHTML = ''; // Limpa o container de FAQs
        DOM.faqLoader.classList.remove('hidden'); // Exibe o loader
        DOM.faqDisplayTitle.textContent = "Carregando..."; // Atualiza o título enquanto carrega
    }

    /**
     * Esconde o indicador de carregamento.
     */
    function hideLoader() {
        DOM.faqLoader.classList.add('hidden'); // Oculta o loader
    }

    /**
     * Exibe uma mensagem de feedback (erro, sem resultados) no container de FAQs.
     * @param {string} message - A mensagem a ser exibida.
     * @param {boolean} isError - True se for uma mensagem de erro, para aplicar estilos diferentes.
     */
    function displayFeedbackMessage(message, isError = false) {
        DOM.faqListContainer.innerHTML = `<p class="info-message ${isError ? 'error-message' : ''}">${message}</p>`;
    }

    // --- Função para Renderizar FAQs no DOM ---

    /**
     * Cria e retorna um elemento HTML para um item do FAQ.
     * @param {Object} faq - O objeto FAQ contendo pergunta, resposta e id.
     * @returns {HTMLElement} O elemento div representando o item do FAQ.
     */
    function createFaqItem(faq) {
        const faqItem = document.createElement('div');
        faqItem.classList.add('faq-item', 'is-active'); // Continua com 'is-active' para iniciar aberto
        faqItem.setAttribute('role', 'article');
        faqItem.setAttribute('aria-labelledby', `question-${faq.id}`);

        const questionHeader = document.createElement('div');
        questionHeader.classList.add('faq-question-header');
        questionHeader.setAttribute('role', 'button'); // Mantemos role="button" para acessibilidade, mas ele não será clicável para toggle
        questionHeader.setAttribute('aria-expanded', 'true'); // Sempre true
        questionHeader.setAttribute('tabindex', '0'); // Torna o elemento focável para navegação, mas não fará toggle
        questionHeader.setAttribute('id', `question-${faq.id}`);

        questionHeader.innerHTML = `<h3>${faq.pergunta}</h3><span class="toggle-icon">-</span>`; // Ícone '-' permanece

        const answerContent = document.createElement('div');
        answerContent.classList.add('faq-answer-content');
        answerContent.setAttribute('role', 'region');
        answerContent.setAttribute('aria-hidden', 'false'); // Sempre false (visível)

        const paragraphs = faq.resposta.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('');
        answerContent.innerHTML = paragraphs;
        
        // REMOVIDO: Listeners para expandir/colapsar
        // questionHeader.addEventListener('click', () => toggleFaqAnswer(faqItem, questionHeader));
        // questionHeader.addEventListener('keydown', (event) => {
        //     if (event.key === 'Enter' || event.key === ' ') {
        //         event.preventDefault();
        //         toggleFaqAnswer(faqItem, questionHeader);
        //     }
        // });

        faqItem.appendChild(questionHeader);
        faqItem.appendChild(answerContent);
        
        // Define max-height após a criação para a transição inicial (ainda importante para o layout)
        setTimeout(() => {
            answerContent.style.maxHeight = answerContent.scrollHeight + "px";
        }, 0);

        return faqItem;
    }

    /**
     * Renderiza um array de objetos FAQ no container DOM.
     * @param {Array<Object>} faqsToRender - O array de FAQs a serem exibidas.
     */
    function renderFaqs(faqsToRender) {
        DOM.faqListContainer.innerHTML = '';
        if (faqsToRender.length === 0) {
            displayFeedbackMessage("Nenhuma pergunta encontrada com o termo de busca.");
            return;
        }

        faqsToRender.forEach(faq => {
            DOM.faqListContainer.appendChild(createFaqItem(faq));
        });
    }

    /**
     * REMOVIDO: Esta função não é mais necessária, pois não haverá toggle.
     * Expande ou colapsa a resposta de um item do FAQ, atualizando estilos e acessibilidade.
     * @param {HTMLElement} faqItem - O elemento div.faq-item pai.
     * @param {HTMLElement} questionHeader - O elemento div.faq-question-header.
     */
    // function toggleFaqAnswer(faqItem, questionHeader) {
    //     const answerContent = faqItem.querySelector('.faq-answer-content');
    //     const toggleIcon = questionHeader.querySelector('.toggle-icon');
        
    //     const isActive = faqItem.classList.toggle('is-active');

    //     questionHeader.setAttribute('aria-expanded', isActive);
    //     answerContent.setAttribute('aria-hidden', !isActive);

    //     if (isActive) {
    //         answerContent.style.maxHeight = answerContent.scrollHeight + "px"; 
    //         toggleIcon.textContent = '-';
    //     } else {
    //         answerContent.style.maxHeight = "0";
    //         toggleIcon.textContent = '+';
    //     }
    // }

    // --- Lógica Principal: Carregamento e Filtragem de Dados ---

    /**
     * Busca os dados do FAQ do arquivo JSON.
     * Gerencia o estado de carregamento e exibe mensagens apropriadas.
     * @async
     */
    async function loadFaqData() {
        showLoader();
        try {
            const response = await fetch(dataFilePath);
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}. Verifique se '${dataFilePath}' está correto.`);
            }
            allFaqData = await response.json();
            allFaqData.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
            
            renderFaqs(allFaqData);
            DOM.faqDisplayTitle.textContent = "Perguntas Frequentes";

        } catch (error) {
            console.error("Falha ao carregar dados do FAQ:", error);
            displayFeedbackMessage(`Não foi possível carregar as perguntas frequentes. ${error.message}`, true);
            DOM.faqDisplayTitle.textContent = "Erro de Carregamento";
        } finally {
            hideLoader();
        }
    }

    /**
     * Realiza a pesquisa de FAQs com base no termo digitado.
     * Atualiza a lista de FAQs exibida e o título da seção.
     */
    function performFaqSearch() {
        const searchTerm = DOM.searchInput.value.toLowerCase().trim();
        let filteredFaqs = [];

        if (searchTerm === '') {
            filteredFaqs = allFaqData;
            DOM.faqDisplayTitle.textContent = "Perguntas Frequentes";
        } else {
            filteredFaqs = allFaqData.filter(faq =>
                faq.pergunta.toLowerCase().includes(searchTerm) ||
                faq.resposta.toLowerCase().includes(searchTerm)
            );
            DOM.faqDisplayTitle.textContent = "Resultados da Busca";
        }
        renderFaqs(filteredFaqs);
    }

    // --- Listeners de Eventos ---

    /**
     * Inicializa os event listeners quando o DOM estiver pronto.
     */
    function initializeEventListeners() {
        DOM.searchButton.addEventListener('click', performFaqSearch);

        DOM.searchInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                performFaqSearch();
            } else if (DOM.searchInput.value.trim() === '' && DOM.faqDisplayTitle.textContent !== "Perguntas Frequentes") {
                performFaqSearch();
            }
        });
    }

    // --- Ponto de Entrada da Aplicação ---
    document.addEventListener('DOMContentLoaded', () => {
        initializeEventListeners();
        loadFaqData();
    });

})(); // Fim do IIFE