// faq.js
document.addEventListener('DOMContentLoaded', () => {
    const faqContainer = document.getElementById('faq-container');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const loadMoreButton = document.getElementById('loadMoreButton');
    const faqSectionTitle = document.querySelector('.faq-section-title .titulo');

    let faqData = [];
    const initialFaqCount = 3;

    async function fetchFaqData() {
        try {
            // APONTA PARA O SEU ARQUIVO JSON
            const response = await fetch('prt.json'); 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} - Verifique se 'prt.json' existe e está na mesma pasta que 'index.html'.`);
            }
            faqData = await response.json();
            
            faqData.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));

            renderFaqs(faqData.slice(0, initialFaqCount));

            if (faqData.length > initialFaqCount) {
                loadMoreButton.style.display = 'block';
            } else {
                loadMoreButton.style.display = 'none';
            }

        } catch (error) {
            console.error("Erro ao carregar as perguntas frequentes:", error);
            faqContainer.innerHTML = '<p class="descricao">Não foi possível carregar as perguntas frequentes no momento. Verifique o console para detalhes do erro.</p>';
            loadMoreButton.style.display = 'none';
        }
    }

    function renderFaqs(faqsToRender) {
        faqContainer.innerHTML = '';

        if (faqsToRender.length === 0) {
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

    function searchFaqs() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        if (searchTerm === '') {
            faqSectionTitle.textContent = "Perguntas Mais Frequentes";
            renderFaqs(faqData.slice(0, initialFaqCount));
            if (faqData.length > initialFaqCount) {
                loadMoreButton.style.display = 'block';
            }
            return;
        }

        const filteredFaqs = faqData.filter(faq =>
            faq.pergunta.toLowerCase().includes(searchTerm) ||
            faq.resposta.toLowerCase().includes(searchTerm)
        );
        
        faqSectionTitle.textContent = "Resultados da Pesquisa";
        renderFaqs(filteredFaqs);
        loadMoreButton.style.display = 'none';
    }

    searchButton.addEventListener('click', searchFaqs);
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            searchFaqs();
        } else if (searchInput.value.trim() === '') {
            faqSectionTitle.textContent = "Perguntas Mais Frequentes";
            renderFaqs(faqData.slice(0, initialFaqCount));
            if (faqData.length > initialFaqCount) {
                loadMoreButton.style.display = 'block';
            }
        }
    });

    loadMoreButton.addEventListener('click', () => {
        renderFaqs(faqData);
        loadMoreButton.style.display = 'none';
        faqSectionTitle.textContent = "Todas as Perguntas Frequentes";
    });

    fetchFaqData();
});