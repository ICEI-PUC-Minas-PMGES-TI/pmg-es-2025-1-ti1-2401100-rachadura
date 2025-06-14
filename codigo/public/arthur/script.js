// script.js
console.log("Arquivo script.js carregado.");

const paginaAtualPath = window.location.pathname;
const nomePaginaAtual = paginaAtualPath.substring(paginaAtualPath.lastIndexOf("/") + 1);

const DENUNCIAS_STORAGE_KEY = 'denunciasUrbanasApp';

// Função para buscar as denúncias do localStorage
const getDenunciasFromStorage = () => {
    const denunciasJSON = localStorage.getItem(DENUNCIAS_STORAGE_KEY);
    return denunciasJSON ? JSON.parse(denunciasJSON) : [];
};

// Função para salvar as denúncias no localStorage
const saveDenunciasToStorage = (denuncias) => {
    localStorage.setItem(DENUNCIAS_STORAGE_KEY, JSON.stringify(denuncias));
};

// Função para carregar as denúncias iniciais do arquivo JSON (apenas na primeira vez)
const inicializarDenuncias = async () => {
    let denuncias = getDenunciasFromStorage();
    if (denuncias.length === 0) {
        try {
            console.log("LocalStorage vazio. Tentando carregar de denuncias.json...");
            const response = await fetch('denuncias.json');
            if (!response.ok) {
                throw new Error(`Erro ao carregar o arquivo JSON: ${response.statusText}`);
            }
            const denunciasDoJson = await response.json();
            saveDenunciasToStorage(denunciasDoJson);
            console.log("Denúncias carregadas do JSON e salvas no localStorage.");
            return denunciasDoJson;
        } catch (error) {
            console.error("Não foi possível carregar as denúncias iniciais do arquivo denuncias.json.", error);
            // Se falhar, o sistema continua com a lista vazia.
            return [];
        }
    }
    return denuncias;
};


const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

const formatarTimestamp = (isoTimestamp) => {
    if (!isoTimestamp) return 'Data indisponível';
    const data = new Date(isoTimestamp);
    return data.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};


if (nomePaginaAtual === 'denuncias.html' || nomePaginaAtual === '' || nomePaginaAtual === 'index.html') {
    console.log("Executando script para a página de listagem de denúncias.");
    const listaDenunciasContainer = document.getElementById('lista-denuncias-container');
    const btnNovaDenuncia = document.getElementById('btn-nova-denuncia');

    const renderizarDenuncias = async () => {
        if (!listaDenunciasContainer) {
            console.error("Elemento 'lista-denuncias-container' não encontrado.");
            return;
        }
        listaDenunciasContainer.innerHTML = '';
        
        // MODIFICAÇÃO: Carrega as denúncias com a nova lógica
        let denuncias = await inicializarDenuncias();

        if (denuncias.length === 0) {
            listaDenunciasContainer.innerHTML = '<p>Nenhuma denúncia registrada ainda. Clique em "Nova Denúncia" para começar.</p>';
            return;
        }

        denuncias.forEach(denuncia => {
            const card = document.createElement('div');
            card.classList.add('denuncia-card');
            card.setAttribute('data-id', denuncia.id);
            let descBreve = denuncia.descricao ? denuncia.descricao : 'Sem descrição detalhada.';
            if (descBreve.length > 100) {
                descBreve = descBreve.substring(0, 100) + '...';
            }
            card.innerHTML = `
                <h3 class="denuncia-card-titulo">${denuncia.titulo || 'Denúncia Sem Título'}</h3>
                <p class="denuncia-card-descricao">${descBreve}</p>
            `;
            card.addEventListener('click', () => {
                window.location.href = `atualizar_denuncia.html?id=${denuncia.id}`;
            });
            listaDenunciasContainer.appendChild(card);
        });
    };

    if (btnNovaDenuncia) {
        btnNovaDenuncia.addEventListener('click', () => {
            window.location.href = 'atualizar_denuncia.html';
        });
    }
    renderizarDenuncias();
}


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
    const denunciaTimelineContainerEl = document.getElementById('denuncia-timeline-container');
    const timelineNewStatusSelect = document.getElementById('timeline-new-status-select');
    const timelineNewNotesInput = document.getElementById('timeline-new-notes');
    const btnAddTimelineEvent = document.getElementById('btn-add-timeline-event');

    let currentDenunciaId = null;
    let denunciaParaEdicao = {
        titulo: '',
        descricao: '',
        imagem: null, // Armazenará a string Base64 da imagem
        video: null,  // Armazenará a string Base64 do vídeo
        timeline: []
    };

    const params = new URLSearchParams(window.location.search);
    currentDenunciaId = params.get('id');
    
    // #############################################################################
    // ### INÍCIO DA GRANDE MUDANÇA: UI para exibir imagem e lógica de remoção  ###
    // #############################################################################
    const updateSelectedFilesUI = () => {
        if (!selectedFilesInfoEl) return;
        let infoHTML = '';
        if (denunciaParaEdicao.imagem) {
            // MODIFICADO: Exibe a imagem em vez de um link
            infoHTML += `
                <div class="media-preview-container">
                    <p>Imagem Adicionada:</p>
                    <img src="${denunciaParaEdicao.imagem}" alt="Pré-visualização da imagem" class="media-preview">
                    <button class="btn-remove-media" data-type="image">Remover Imagem</button>
                </div>`;
        }
        if (denunciaParaEdicao.video) {
            // MODIFICADO: Exibe um player de vídeo. ATENÇÃO: Vídeos em Base64 podem ser muito grandes!
             infoHTML += `
                <div class="media-preview-container">
                    <p>Vídeo Adicionado:</p>
                    <video controls class="media-preview">
                        <source src="${denunciaParaEdicao.video}">
                        Seu navegador não suporta o player de vídeo.
                    </video>
                    <button class="btn-remove-media" data-type="video">Remover Vídeo</button>
                </div>`;
        }
        selectedFilesInfoEl.innerHTML = infoHTML || '<p>Nenhuma mídia adicionada.</p>';

        document.querySelectorAll('.btn-remove-media').forEach(button => {
            button.addEventListener('click', (e) => {
                const type = e.target.dataset.type;
                if (type === 'image') {
                    denunciaParaEdicao.imagem = null;
                    if (imageInput) imageInput.value = '';
                } else if (type === 'video') {
                    denunciaParaEdicao.video = null;
                    if (videoInput) videoInput.value = '';
                }
                updateSelectedFilesUI();
            });
        });
    };
    // #############################################################################
    // ### FIM DA GRANDE MUDANÇA: UI para exibir imagem e lógica de remoção      ###
    // #############################################################################

    const renderizarTimeline = (timelineArray) => {
        if (!denunciaTimelineContainerEl) return;
        denunciaTimelineContainerEl.innerHTML = '';
        if (!timelineArray || timelineArray.length === 0) {
            denunciaTimelineContainerEl.innerHTML = '<p>Nenhum histórico para esta denúncia ainda.</p>';
            return;
        }
        const ul = document.createElement('ul');
        ul.classList.add('timeline-list');
        timelineArray.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).forEach(evento => {
            const li = document.createElement('li');
            li.classList.add('timeline-item');
            li.innerHTML = `
                <div class="timeline-item-status">${evento.status}</div>
                <div class="timeline-item-timestamp">${formatarTimestamp(evento.timestamp)}</div>
                ${evento.notas ? `<div class="timeline-item-notes">${evento.notas}</div>` : ''}
            `;
            ul.appendChild(li);
        });
        denunciaTimelineContainerEl.appendChild(ul);
    };

    const carregarDadosDenuncia = () => {
        if (currentDenunciaId) {
            const denuncias = getDenunciasFromStorage();
            const encontrada = denuncias.find(d => d.id === currentDenunciaId);
            if (encontrada) {
                denunciaParaEdicao = { ...encontrada };
                denunciaParaEdicao.timeline = Array.isArray(denunciaParaEdicao.timeline) ? denunciaParaEdicao.timeline : [];
                if (headerTitleEl) headerTitleEl.textContent = "Editar Denúncia";
                if (cartaoTitleEl) cartaoTitleEl.textContent = "Editar Denúncia";
                if (denunciaTituloInput) denunciaTituloInput.value = denunciaParaEdicao.titulo;
                if (updateDescription) updateDescription.value = denunciaParaEdicao.descricao;
                if (btnDelete) btnDelete.style.display = 'inline-block';
            } else {
                alert("Denúncia não encontrada. Redirecionando para a lista.");
                window.location.href = 'denuncias.html';
                return;
            }
        } else {
            if (headerTitleEl) headerTitleEl.textContent = "Nova Denúncia";
            if (cartaoTitleEl) cartaoTitleEl.textContent = "Criar Nova Denúncia";
            if (btnDelete) btnDelete.style.display = 'none';
            denunciaParaEdicao.timeline = [];
        }
        updateSelectedFilesUI();
        renderizarTimeline(denunciaParaEdicao.timeline);
    };

    if (btnAddTimelineEvent) {
        btnAddTimelineEvent.addEventListener('click', () => {
            const novoStatus = timelineNewStatusSelect.value;
            const novasNotas = timelineNewNotesInput.value.trim();
            if (!novoStatus) {
                alert("Por favor, selecione um status para adicionar ao histórico.");
                timelineNewStatusSelect.focus();
                return;
            }
            const novoEventoTimeline = {
                status: novoStatus,
                timestamp: new Date().toISOString(),
                notas: novasNotas || ""
            };
            if (!Array.isArray(denunciaParaEdicao.timeline)) {
                denunciaParaEdicao.timeline = [];
            }
            denunciaParaEdicao.timeline.push(novoEventoTimeline);
            renderizarTimeline(denunciaParaEdicao.timeline);
            timelineNewStatusSelect.selectedIndex = 0;
            timelineNewNotesInput.value = '';
        });
    }

    // #############################################################################
    // ### INÍCIO DA GRANDE MUDANÇA: Lógica de captura da imagem com FileReader  ###
    // #############################################################################
    const handleFileSelect = (event, type) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        // A função onloadend é chamada quando a leitura do arquivo termina
        reader.onloadend = () => {
            // O resultado (reader.result) é a string Base64 da mídia
            console.log(`Arquivo ${type} convertido para Base64.`);
            if (type === 'image') {
                denunciaParaEdicao.imagem = reader.result;
            } else if (type === 'video') {
                denunciaParaEdicao.video = reader.result;
            }
            // Atualiza a UI para mostrar a mídia
            updateSelectedFilesUI();
        };

        // Inicia a leitura do arquivo. Isso dispara o 'onloadend' quando terminar.
        reader.readAsDataURL(file);
    };

    if (btnAddImage && imageInput) {
        btnAddImage.addEventListener('click', () => imageInput.click());
        imageInput.addEventListener('change', (event) => handleFileSelect(event, 'image'));
    }

    if (btnAddVideo && videoInput) {
        btnAddVideo.addEventListener('click', () => videoInput.click());
        videoInput.addEventListener('change', (event) => handleFileSelect(event, 'video'));
    }
    // #############################################################################
    // ### FIM DA GRANDE MUDANÇA: Lógica de captura da imagem                    ###
    // #############################################################################


    if (btnSave) {
        btnSave.addEventListener('click', () => {
            const titulo = denunciaTituloInput.value.trim();
            const descricao = updateDescription.value.trim();
            if (!titulo) {
                alert("O título da denúncia é obrigatório.");
                denunciaTituloInput.focus();
                return;
            }
            if (!descricao && !denunciaParaEdicao.imagem && !denunciaParaEdicao.video) {
                alert("Adicione uma descrição ou uma mídia (imagem/vídeo) para a denúncia.");
                updateDescription.focus();
                return;
            }
            let denuncias = getDenunciasFromStorage();
            const dadosDenunciaAtualizada = {
                ...denunciaParaEdicao,
                titulo: titulo,
                descricao: descricao,
            };
            if (currentDenunciaId) {
                const index = denuncias.findIndex(d => d.id === currentDenunciaId);
                if (index !== -1) {
                    denuncias[index] = { ...denuncias[index], ...dadosDenunciaAtualizada };
                }
            } else {
                dadosDenunciaAtualizada.id = generateUniqueId();
                if (dadosDenunciaAtualizada.timeline.length === 0) {
                    dadosDenunciaAtualizada.timeline.push({
                        status: "Denúncia Criada",
                        timestamp: new Date().toISOString(),
                        notas: "Denúncia registrada pelo usuário."
                    });
                }
                denuncias.push(dadosDenunciaAtualizada);
            }
            saveDenunciasToStorage(denuncias);
            alert("Denúncia salva com sucesso!");
            window.location.href = 'denuncias.html';
        });
    }

    if (btnDelete) {
        btnDelete.addEventListener('click', () => {
            if (!currentDenunciaId) return;
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
            window.location.href = 'denuncias.html';
        });
    }

    carregarDadosDenuncia();
}

console.log("Fim da execução do script.js. Página atual:", nomePaginaAtual);