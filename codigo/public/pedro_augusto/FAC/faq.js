// faq.js
document.addEventListener('DOMContentLoaded', () => {
    // Seleção de elementos do DOM
    const faqContainer = document.getElementById('faq-container');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const loadMoreButton = document.getElementById('loadMoreButton');
    const faqSectionTitle = document.querySelector('.faq-section-title .titulo');

    let faqData = []; // Armazenará todos os dados do FAQ carregados do JSON
    const initialFaqCount = 3; // Número de FAQs a serem exibidas inicialmente

    // Função assíncrona para buscar os dados do FAQ
    async function fetchFaqData() {
        try {
            // Tenta carregar o arquivo prt.json.
            // Certifique-se de que 'prt.json' está na mesma pasta que 'index.html'.
            const response = await fetch('prt.json'); 
            
            // Verifica se a requisição foi bem-sucedida (status 200-299)
            if (!response.ok) {
                // Se houver um erro HTTP (ex: 404 Not Found), lança uma exceção.
                throw new Error(`HTTP error! status: ${response.status} - Verifique se 'prt.json' existe e está na mesma pasta que 'index.html'.`);
            }
            
            // Converte a resposta para JSON
            faqData = await response.json();
            
            // Ordena as FAQs pela data de criação em ordem decrescente (mais recente primeiro)
            faqData.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));

            // Renderiza o número inicial de FAQs
            renderFaqs(faqData.slice(0, initialFaqCount));

            // Mostra o botão "Ver Todas as Perguntas" se houver mais FAQs do que o número inicial
            if (faqData.length > initialFaqCount) {
                loadMoreButton.style.display = 'block';
            } else {
                loadMoreButton.style.display = 'none';
            }

        } catch (error) {
            // Captura e exibe qualquer erro que ocorra durante o fetch ou processamento
            console.error("Erro ao carregar as perguntas frequentes:", error);
            // Exibe uma mensagem de erro amigável no container do FAQ
            faqContainer.innerHTML = '<p class="descricao">Não foi possível carregar as perguntas frequentes no momento. Verifique o console para detalhes do erro.</p>';
            loadMoreButton.style.display = 'none'; // Garante que o botão "Ver Todas" seja ocultado em caso de erro
        }
    }

    // Função para renderizar um array de FAQs no DOM
    function renderFaqs(faqsToRender) {
        faqContainer.innerHTML = ''; // Limpa o conteúdo atual do container

        // Se não houver FAQs para renderizar, exibe uma mensagem
        if (faqsToRender.length === 0) {
            faqContainer.innerHTML = '<p class="descricao no-results">Nenhuma pergunta encontrada com o termo de busca.</p>';
            return;
        }

        // Itera sobre cada FAQ e cria os elementos HTML correspondentes
        faqsToRender.forEach(faq => {
            const faqItem = document.createElement('div');
            faqItem.classList.add('faq-item', 'cartao'); // Adiciona classes para estilização

            const question = document.createElement('div');
            question.classList.add('faq-question');
            // Conteúdo HTML da pergunta com um ícone de toggle
            question.innerHTML = `<h3>${faq.pergunta}</h3><span class="toggle-icon">+</span>`;

            // Adiciona um event listener para expandir/colapsar a resposta
            question.addEventListener('click', () => toggleAnswer(faqItem, question.querySelector('.toggle-icon')));

            const answer = document.createElement('div');
            answer.classList.add('faq-answer');
            answer.innerHTML = `<p>${faq.resposta}</p>`; // Conteúdo HTML da resposta

            // Anexa os elementos ao item do FAQ e o item ao container principal
            faqItem.appendChild(question);
            faqItem.appendChild(answer);
            faqContainer.appendChild(faqItem);
        });
    }

    // Função para alternar a visibilidade da resposta de um item do FAQ
    function toggleAnswer(faqItem, toggleIcon) {
        const answer = faqItem.querySelector('.faq-answer');
        faqItem.classList.toggle('active'); // Alterna a classe 'active' no item pai

        if (faqItem.classList.contains('active')) {
            // Quando ativo, define max-height para o scrollHeight real do conteúdo,
            // garantindo que todo o texto seja visível sem cortar.
            // O CSS com transition cuidará da animação.
            answer.style.maxHeight = answer.scrollHeight + "px";
            toggleIcon.textContent = '-'; // Muda o ícone para indicar que está expandido
        } else {
            // Quando inativo, define max-height de volta para 0 para colapsar a resposta
            answer.style.maxHeight = "0";
            toggleIcon.textContent = '+'; // Muda o ícone de volta para '+'
        }
    }

    // Função para pesquisar FAQs com base no termo de busca
    function searchFaqs() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        // Se o termo de busca estiver vazio, retorna para as FAQs iniciais
        if (searchTerm === '') {
            faqSectionTitle.textContent = "Perguntas Mais Frequentes";
            renderFaqs(faqData.slice(0, initialFaqCount));
            if (faqData.length > initialFaqCount) {
                loadMoreButton.style.display = 'block';
            } else {
                loadMoreButton.style.display = 'none'; // Garante que o botão seja escondido se não houver mais
            }
            return;
        }

        // Filtra as FAQs que incluem o termo de busca na pergunta ou resposta
        const filteredFaqs = faqData.filter(faq =>
            faq.pergunta.toLowerCase().includes(searchTerm) ||
            faq.resposta.toLowerCase().includes(searchTerm)
        );
        
        faqSectionTitle.textContent = "Resultados da Pesquisa"; // Atualiza o título da seção
        renderFaqs(filteredFaqs); // Renderiza apenas as FAQs filtradas
        loadMoreButton.style.display = 'none'; // Esconde o botão "Ver Todas" durante a pesquisa
    }

    // Event listener para o botão de pesquisa
    searchButton.addEventListener('click', searchFaqs);

    // Event listener para o campo de input de pesquisa (ao digitar e pressionar Enter)
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            searchFaqs(); // Executa a pesquisa ao pressionar Enter
        } 
        // Se o campo de busca for esvaziado, exibe as FAQs iniciais
        else if (searchInput.value.trim() === '') {
            faqSectionTitle.textContent = "Perguntas Mais Frequentes";
            renderFaqs(faqData.slice(0, initialFaqCount));
            if (faqData.length > initialFaqCount) {
                loadMoreButton.style.display = 'block';
            } else {
                loadMoreButton.style.display = 'none';
            }
        }
    });

    // Event listener para o botão "Ver Todas as Perguntas"
    loadMoreButton.addEventListener('click', () => {
        renderFaqs(faqData); // Renderiza todas as FAQs disponíveis
        loadMoreButton.style.display = 'none'; // Esconde o botão após exibir todas
        faqSectionTitle.textContent = "Todas as Perguntas Frequentes"; // Atualiza o título da seção
    });

    // Inicia o processo de carregamento e renderização das FAQs quando o DOM está pronto
    fetchFaqData();
});