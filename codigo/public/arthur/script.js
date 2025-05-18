// script.js
console.log("Arquivo script.js carregado.");

const paginaAtualPath = window.location.pathname;
const nomePaginaAtual = paginaAtualPath.substring(paginaAtualPath.lastIndexOf("/") + 1);

const DENUNCIAS_STORAGE_KEY = 'denunciasUrbanasApp'; // Chave única para o localStorage

// --- Funções Utilitárias para localStorage ---
const getDenunciasFromStorage = () => {
    const denunciasJSON = localStorage.getItem(DENUNCIAS_STORAGE_KEY);
    return denunciasJSON ? JSON.parse(denunciasJSON) : [];
};

const saveDenunciasToStorage = (denuncias) => {
    localStorage.setItem(DENUNCIAS_STORAGE_KEY, JSON.stringify(denuncias));
};

const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

// --- Denúncias Genéricas Iniciais ---
const denunciasGenericasPadrao = [
    {
        id: generateUniqueId(),
        titulo: "Vazamento de Água na Rua das Flores",
        descricao: "Há um vazamento de água limpa constante na calçada da Rua das Flores, altura do número 250. O desperdício é grande e já forma poças, dificultando a passagem de pedestres. Problema persiste há 3 dias.",
        imagem: null, // Nome do arquivo, ex: 'vazamento.jpg'
        video: null   // Nome do arquivo, ex: 'video_vazamento.mp4'
    },
    {
        id: generateUniqueId(),
        titulo: "Semáforo com Defeito no Cruzamento Principal",
        descricao: "O semáforo do cruzamento da Av. Brasil com a Rua México está intermitente (piscando amarelo) há várias horas, causando confusão e risco de acidentes, especialmente em horários de pico.",
        imagem: null,
        video: null
    },
    {
        id: generateUniqueId(),
        titulo: "Terreno com Matagal e Entulho",
        descricao: "Um terreno na Rua das Acácias, ao lado do posto de saúde, está com mato muito alto e acúmulo de entulho, o que pode ser foco de mosquitos da dengue e outros vetores. Moradores pedem limpeza.",
        imagem: null,
        video: null
    }
];

// --- Lógica Específica para a Página de Listagem (denuncias.html ou index.html) ---
if (nomePaginaAtual === 'denuncias.html' || nomePaginaAtual === '' || nomePaginaAtual === 'index.html') {
    console.log("Executando script para a página de listagem de denúncias.");
    const listaDenunciasContainer = document.getElementById('lista-denuncias-container');
    const btnNovaDenuncia = document.getElementById('btn-nova-denuncia');

    const renderizarDenuncias = () => {
        if (!listaDenunciasContainer) {
            console.error("Elemento 'lista-denuncias-container' não encontrado.");
            return;
        }
        listaDenunciasContainer.innerHTML = ''; // Limpa a lista existente
        let denuncias = getDenunciasFromStorage();

        if (denuncias.length === 0) {
            console.log("Nenhuma denúncia no localStorage. Adicionando denúncias genéricas.");
            saveDenunciasToStorage(denunciasGenericasPadrao);
            denuncias = denunciasGenericasPadrao;
        }

        if (denuncias.length === 0) {
            listaDenunciasContainer.innerHTML = '<p>Nenhuma denúncia registrada ainda. Clique em "Nova Denúncia" para começar.</p>';
            return;
        }

        denuncias.forEach(denuncia => {
            const card = document.createElement('div');
            card.classList.add('denuncia-card');
            card.setAttribute('data-id', denuncia.id);
            card.innerHTML = `
                <h3 class="denuncia-card-titulo">${denuncia.titulo || 'Denúncia Sem Título'}</h3>
                <p class="denuncia-card-descricao">${denuncia.descricao ? (denuncia.descricao.length > 100 ? denuncia.descricao.substring(0, 100) + '...' : denuncia.descricao) : 'Sem descrição detalhada.'}</p>
            `;
            card.addEventListener('click', () => {
                window.location.href = `atualizar_denuncia.html?id=${denuncia.id}`;
            });
            listaDenunciasContainer.appendChild(card);
        });
    };

    if (btnNovaDenuncia) {
        btnNovaDenuncia.addEventListener('click', () => {
            window.location.href = 'atualizar_denuncia.html'; // Vai para a página de edição sem ID (nova denúncia)
        });
    }

    // Renderizar denúncias ao carregar a página
    renderizarDenuncias();
}

// --- Lógica Específica para a Página de Atualização/Criação (atualizar_denuncia.html) ---
if (nomePaginaAtual === 'atualizar_denuncia.html') {
    console.log("Executando script para a página de atualização/criação de denúncia.");

    const headerTitleEl = document.getElementById('header-title');
    const cartaoTitleEl = document.getElementById('cartao-title');
    const denunciaTituloInput = document.getElementById('denuncia-titulo-input');
    const btnAddImage = document.getElementById('btn-add-image');
    const btnAddVideo = document.getElementById('btn-add-video');
    const imageInput = document.getElementById('image-input');
    const videoInput = document.getElementById('video-input');
    const updateDescription = document.getElementById('update-description');
    const btnBack = document.getElementById('btn-back');
    const btnSave = document.getElementById('btn-save');
    const btnDelete = document.getElementById('btn-delete');
    const selectedFilesInfoEl = document.getElementById('selected-files-info');


    let currentDenunciaId = null;
    let denunciaParaEdicao = {
        titulo: '',
        descricao: '',
        imagem: null,
        video: null
    };

    const params = new URLSearchParams(window.location.search);
    currentDenunciaId = params.get('id');

    const updateSelectedFilesUI = () => {
        if (!selectedFilesInfoEl) return;
        let infoHTML = '';
        if (denunciaParaEdicao.imagem) {
            infoHTML += `<p>Imagem: ${denunciaParaEdicao.imagem} <button class="btn-remove-media" data-type="image">Remover</button></p>`;
        }
        if (denunciaParaEdicao.video) {
            infoHTML += `<p>Vídeo: ${denunciaParaEdicao.video} <button class="btn-remove-media" data-type="video">Remover</button></p>`;
        }
        selectedFilesInfoEl.innerHTML = infoHTML || '<p>Nenhuma mídia adicionada.</p>';

        document.querySelectorAll('.btn-remove-media').forEach(button => {
            button.addEventListener('click', (e) => {
                const type = e.target.dataset.type;
                if (type === 'image') {
                    denunciaParaEdicao.imagem = null;
                    if (imageInput) imageInput.value = ''; // Limpa o input se o usuário selecionou e depois removeu
                } else if (type === 'video') {
                    denunciaParaEdicao.video = null;
                    if (videoInput) videoInput.value = '';
                }
                updateSelectedFilesUI(); // Re-renderiza a UI de arquivos
            });
        });
    };


    const carregarDadosDenuncia = () => {
        if (currentDenunciaId) {
            const denuncias = getDenunciasFromStorage();
            const encontrada = denuncias.find(d => d.id === currentDenunciaId);
            if (encontrada) {
                denunciaParaEdicao = { ...encontrada }; // Copia para evitar mutação direta
                if (headerTitleEl) headerTitleEl.textContent = "Editar Denúncia";
                if (cartaoTitleEl) cartaoTitleEl.textContent = "Editar Denúncia";
                if (denunciaTituloInput) denunciaTituloInput.value = denunciaParaEdicao.titulo;
                if (updateDescription) updateDescription.value = denunciaParaEdicao.descricao;
                if (btnDelete) btnDelete.style.display = 'inline-block'; // Mostra o botão de excluir
            } else {
                alert("Denúncia não encontrada. Redirecionando para a lista.");
                window.location.href = 'denuncias.html';
                return; // Sai da função se não encontrar
            }
        } else {
            if (headerTitleEl) headerTitleEl.textContent = "Nova Denúncia";
            if (cartaoTitleEl) cartaoTitleEl.textContent = "Criar Nova Denúncia";
            if (btnDelete) btnDelete.style.display = 'none'; // Esconde o botão de excluir
        }
        updateSelectedFilesUI(); // Atualiza a UI com os nomes dos arquivos salvos ou limpa
    };

    if (btnAddImage && imageInput) {
        btnAddImage.addEventListener('click', () => imageInput.click());
        imageInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                denunciaParaEdicao.imagem = file.name;
                console.log(`Imagem selecionada: ${denunciaParaEdicao.imagem}`);
                updateSelectedFilesUI();
                // Não limpar o event.target.value aqui, pois o arquivo ainda não foi "salvo" no localStorage
            }
        });
    }

    if (btnAddVideo && videoInput) {
        btnAddVideo.addEventListener('click', () => videoInput.click());
        videoInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                denunciaParaEdicao.video = file.name;
                console.log(`Vídeo selecionado: ${denunciaParaEdicao.video}`);
                updateSelectedFilesUI();
            }
        });
    }

    if (btnSave) {
        btnSave.addEventListener('click', () => {
            const titulo = denunciaTituloInput.value.trim();
            const descricao = updateDescription.value.trim();

            if (!titulo) {
                alert("O título da denúncia é obrigatório.");
                denunciaTituloInput.focus();
                return;
            }
            // Descrição pode ser opcional se houver mídia, ou vice-versa.
            // Ajuste a lógica de validação conforme necessário.
             if (!descricao && !denunciaParaEdicao.imagem && !denunciaParaEdicao.video) {
                alert("Adicione uma descrição ou uma mídia (imagem/vídeo) para a denúncia.");
                updateDescription.focus();
                return;
            }


            let denuncias = getDenunciasFromStorage();
            const dadosDenunciaAtualizada = {
                ...denunciaParaEdicao, // Pega ID, imagem, video que já estavam
                titulo: titulo,
                descricao: descricao,
            };


            if (currentDenunciaId) { // Editando existente
                const index = denuncias.findIndex(d => d.id === currentDenunciaId);
                if (index !== -1) {
                    denuncias[index] = { ...denuncias[index], ...dadosDenunciaAtualizada };
                }
            } else { // Nova denúncia
                dadosDenunciaAtualizada.id = generateUniqueId();
                denuncias.push(dadosDenunciaAtualizada);
            }

            saveDenunciasToStorage(denuncias);
            alert("Denúncia salva com sucesso!");
            console.log("Denúncia salva:", dadosDenunciaAtualizada);
            window.location.href = 'denuncias.html';
        });
    }

    if (btnDelete) {
        btnDelete.addEventListener('click', () => {
            if (!currentDenunciaId) {
                alert("Nenhuma denúncia selecionada para excluir.");
                return;
            }
            if (confirm("Tem certeza que deseja excluir esta denúncia? Esta ação não pode ser desfeita.")) {
                let denuncias = getDenunciasFromStorage();
                denuncias = denuncias.filter(d => d.id !== currentDenunciaId);
                saveDenunciasToStorage(denuncias);
                alert("Denúncia excluída com sucesso!");
                window.location.href = 'denuncias.html';
            }
        });
    }

    if (btnBack) {
        btnBack.addEventListener('click', () => {
            // Pode-se adicionar uma lógica para verificar se houve alterações não salvas antes de voltar
            window.location.href = 'denuncias.html';
        });
    }

    // Carregar dados da denúncia ao iniciar a página (se estiver editando)
    // É importante que isso seja chamado após a configuração dos event listeners dos botões de mídia
    // para que `denunciaParaEdicao` já esteja inicializado.
    carregarDadosDenuncia();
}

console.log("Fim da execução do script.js. Página atual:", nomePaginaAtual);