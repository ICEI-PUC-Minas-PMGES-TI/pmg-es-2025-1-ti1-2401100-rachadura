document.addEventListener('DOMContentLoaded', () => {
    const faqContainer = document.getElementById('faq-container');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    let faqData = []; // Armazenará os dados do JSON

    // Função para carregar os dados do JSON
    async function fetchFaqData() {
        try {
            const response = await fetch('faq-data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            faqData = await response.json();
            // Ordena as FAQs pela data de criação (mais recente primeiro)
            faqData.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
            renderFaqs(faqData); // Renderiza as FAQs ordenadas
        } catch (error) {
            console.error("Erro ao carregar as perguntas frequentes:", error);
            faqContainer.innerHTML = '<p class="descricao">Não foi possível carregar as perguntas frequentes no momento. Tente novamente mais tarde.</p>';
        }
    }

    // Função para renderizar as perguntas e respostas
    function renderFaqs(faqsToRender) {
        faqContainer.innerHTML = ''; // Limpa o container antes de adicionar novas FAQs
        if (faqsToRender.length === 0) {
            faqContainer.innerHTML = '<p class="descricao">Nenhuma pergunta encontrada.</p>';
            return;
        }

        faqsToRender.forEach(faq => {
            const faqItem = document.createElement('div');
            faqItem.classList.add('faq-item', 'cartao'); // Adiciona a classe 'cartao'

            const question = document.createElement('div');
            question.classList.add('faq-question');
            // Opcional: para exibir a data ao lado da pergunta
            // question.innerHTML = `<h3>${faq.pergunta} <span style="font-size: 0.8em; color: var(--cor-texto-secundario);">(${faq.dataCriacao})</span></h3><span class="toggle-icon">+</span>`;
            question.innerHTML = `<h3>${faq.pergunta}</h3><span class="toggle-icon">+</span>`;

            question.addEventListener('click', () => toggleAnswer(faqItem, question.querySelector('.toggle-icon')));

            const answer = document.createElement('div');
            answer.classList.add('faq-answer');
            answer.innerHTML = `<p>${faq.resposta}</p>`;

            faqItem.appendChild(question);
            faqItem.appendChild(answer);
            faqContainer.appendChild(faqItem);
        });
    }

    // Função para expandir/colapsar a resposta
    function toggleAnswer(faqItem, toggleIcon) {
        const answer = faqItem.querySelector('.faq-answer');
        faqItem.classList.toggle('active');
        if (faqItem.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + "px"; // Expande
            toggleIcon.textContent = '-'; // Muda ícone para '-'
        } else {
            answer.style.maxHeight = "0"; // Colapsa
            toggleIcon.textContent = '+'; // Muda ícone para '+'
        }
    }

    // Função de busca
    function searchFaqs() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredFaqs = faqData.filter(faq =>
            faq.pergunta.toLowerCase().includes(searchTerm) ||
            faq.resposta.toLowerCase().includes(searchTerm)
        );
        renderFaqs(filteredFaqs);
    }

    // Event Listeners
    searchButton.addEventListener('click', searchFaqs);
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            searchFaqs();
        }
    });

    // Carrega os dados quando a página é carregada
    fetchFaqData();
    document.addEventListener('DOMContentLoaded', () => {
    const faqContainer = document.getElementById('faq-container');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    let faqData = []; // Armazenará os dados do JSON

    // Função para carregar os dados do JSON
    async function fetchFaqData() {
        try {
            const response = await fetch('faq-data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            faqData = await response.json();
            // Ordena as FAQs pela data de criação (mais recente primeiro)
            faqData.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
            renderFaqs(faqData); // Renderiza as FAQs ordenadas ao carregar a página
        } catch (error) {
            console.error("Erro ao carregar as perguntas frequentes:", error);
            faqContainer.innerHTML = '<p class="descricao">Não foi possível carregar as perguntas frequentes no momento. Tente novamente mais tarde.</p>';
        }
    }

    // Função para renderizar as perguntas e respostas
    function renderFaqs(faqsToRender) {
        faqContainer.innerHTML = ''; // Limpa o container antes de adicionar novas FAQs

        if (faqsToRender.length === 0) {
            // Se não houver perguntas para renderizar, exibe uma mensagem
            faqContainer.innerHTML = '<p class="descricao no-results">Nenhuma pergunta encontrada com o termo de busca.</p>';
            return;
        }

        faqsToRender.forEach(faq => {
            const faqItem = document.createElement('div');
            faqItem.classList.add('faq-item', 'cartao');

            const question = document.createElement('div');
            question.classList.add('faq-question');
            question.innerHTML = `<h3>${faq.pergunta}</h3><span class="toggle-icon">+</span>`;

            question.addEventListener('click', () => toggleAnswer(faqItem, question.querySelector('.toggle-icon')));

            const answer = document.createElement('div');
            answer.classList.add('faq-answer');
            answer.innerHTML = `<p>${faq.resposta}</p>`;

            faqItem.appendChild(question);
            faqItem.appendChild(answer);
            faqContainer.appendChild(faqItem);
        });
    }

    // Função para expandir/colapsar a resposta (inalterada)
    function toggleAnswer(faqItem, toggleIcon) {
        const answer = faqItem.querySelector('.faq-answer');
        faqItem.classList.toggle('active');
        if (faqItem.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + "px";
            toggleIcon.textContent = '-';
        } else {
            answer.style.maxHeight = "0";
            toggleIcon.textContent = '+';
        }
    }

    // Função de busca
    function searchFaqs() {
        const searchTerm = searchInput.value.toLowerCase().trim(); // Adicionado .trim()
        
        if (searchTerm === '') { // Se a pesquisa estiver vazia, renderiza todas as FAQs novamente
            renderFaqs(faqData);
            return;
        }

        const filteredFaqs = faqData.filter(faq =>
            faq.pergunta.toLowerCase().includes(searchTerm) ||
            faq.resposta.toLowerCase().includes(searchTerm)
        );
        renderFaqs(filteredFaqs);
    }

    // Event Listeners
    searchButton.addEventListener('click', searchFaqs);
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            searchFaqs();
        } else if (searchInput.value.trim() === '' && faqContainer.querySelectorAll('.faq-item').length !== faqData.length) {
            // Se o campo de pesquisa estiver vazio e nem todas as FAQs estiverem visíveis, restaura a lista completa
            renderFaqs(faqData);
        }
    });


    // Carrega os dados quando a página é carregada (Isso garante que as perguntas já apareçam)
    fetchFaqData();
});
});