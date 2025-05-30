// script.js
console.log("Arquivo script.js carregado.");

const paginaAtualPath = window.location.pathname;
const nomePaginaAtual = paginaAtualPath.substring(paginaAtualPath.lastIndexOf("/") + 1);

const DENUNCIAS_STORAGE_KEY = 'denunciasUrbanasApp';

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

const denunciasGenericasPadrao = [
    {
        id: generateUniqueId(),
        titulo: "Vazamento de Água na Rua das Flores",
        descricao: "Há um vazamento de água limpa constante na calçada da Rua das Flores, altura do número 250. O desperdício é grande e já forma poças, dificultando a passagem de pedestres. Problema persiste há 3 dias.",
        imagem: null, video: null,
        timeline: [
            { status: "Denúncia Criada", timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), notas: "Denúncia registrada automaticamente no sistema." }
        ]
    },
    {
        id: generateUniqueId(),
        titulo: "Semáforo com Defeito no Cruzamento Principal",
        descricao: "O semáforo do cruzamento da Av. Brasil com a Rua México está intermitente (piscando amarelo) há várias horas, causando confusão e risco de acidentes, especialmente em horários de pico.",
        imagem: null, video: null,
        timeline: [
            { status: "Denúncia Criada", timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), notas: "Denúncia registrada automaticamente no sistema." }
        ]
    },
    {
        id: generateUniqueId(),
        titulo: "Terreno com Matagal e Entulho",
        descricao: "Um terreno na Rua das Acácias, ao lado do posto de saúde, está com mato muito alto e acúmulo de entulho, o que pode ser foco de mosquitos da dengue e outros vetores. Moradores pedem limpeza.",
        imagem: null, video: null,
        timeline: [
            { status: "Denúncia Criada", timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), notas: "Denúncia registrada automaticamente no sistema." }
        ]
    }
];

if (nomePaginaAtual === 'denuncias.html' || nomePaginaAtual === '' || nomePaginaAtual === 'index.html') {
    // ... (código da página de listagem permanece o mesmo)
    console.log("Executando script para a página de listagem de denúncias.");
    const listaDenunciasContainer = document.getElementById('lista-denuncias-container');
    const btnNovaDenuncia = document.getElementById('btn-nova-denuncia');

    const renderizarDenuncias = () => {
        if (!listaDenunciasContainer) {
            console.error("Elemento 'lista-denuncias-container' não encontrado.");
            return;
        }
        listaDenunciasContainer.innerHTML = '';
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

    // ADICIONADO: Elementos para adicionar novo evento à timeline
    const timelineNewStatusInput = document.getElementById('timeline-new-status');
    const timelineNewNotesInput = document.getElementById('timeline-new-notes');
    const btnAddTimelineEvent = document.getElementById('btn-add-timeline-event');

    let currentDenunciaId = null;
    let denunciaParaEdicao = {
        titulo: '',
        descricao: '',
        imagem: null,
        video: null,
        timeline: []
    };

    const params = new URLSearchParams(window.location.search);
    currentDenunciaId = params.get('id');

    const updateSelectedFilesUI = () => {
        // ... (código permanece o mesmo)
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
                    if (imageInput) imageInput.value = '';
                } else if (type === 'video') {
                    denunciaParaEdicao.video = null;
                    if (videoInput) videoInput.value = '';
                }
                updateSelectedFilesUI();
            });
        });
    };

    const renderizarTimeline = (timelineArray) => {
        if (!denunciaTimelineContainerEl) {
            console.error("Elemento 'denuncia-timeline-container' não encontrado.");
            return;
        }
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
                // Garante que timeline seja sempre um array
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
            denunciaParaEdicao.timeline = []; // Inicia timeline vazia para nova denúncia
        }
        updateSelectedFilesUI();
        renderizarTimeline(denunciaParaEdicao.timeline);
    };

    // ADICIONADO: Event listener para o botão "Adicionar ao Histórico"
    if (btnAddTimelineEvent) {
        btnAddTimelineEvent.addEventListener('click', () => {
            const novoStatus = timelineNewStatusInput.value.trim();
            const novasNotas = timelineNewNotesInput.value.trim();

            if (!novoStatus) {
                alert("Por favor, informe o novo status para adicionar ao histórico.");
                timelineNewStatusInput.focus();
                return;
            }

            const novoEventoTimeline = {
                status: novoStatus,
                timestamp: new Date().toISOString(),
                notas: novasNotas || "" // Garante que notas seja uma string
            };

            // Adiciona o novo evento ao array da timeline em memória
            if (!Array.isArray(denunciaParaEdicao.timeline)) { // Segurança extra
                denunciaParaEdicao.timeline = [];
            }
            denunciaParaEdicao.timeline.push(novoEventoTimeline);

            // Re-renderiza a timeline para mostrar o novo evento
            renderizarTimeline(denunciaParaEdicao.timeline);

            // Limpa os campos de input
            timelineNewStatusInput.value = '';
            timelineNewNotesInput.value = '';
            console.log("Novo evento adicionado à timeline (em memória):", novoEventoTimeline);
        });
    }


    if (btnAddImage && imageInput) {
        btnAddImage.addEventListener('click', () => imageInput.click());
        imageInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                denunciaParaEdicao.imagem = file.name;
                updateSelectedFilesUI();
            }
        });
    }

    if (btnAddVideo && videoInput) {
        btnAddVideo.addEventListener('click', () => videoInput.click());
        videoInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                denunciaParaEdicao.video = file.name;
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
            if (!descricao && !denunciaParaEdicao.imagem && !denunciaParaEdicao.video) {
                alert("Adicione uma descrição ou uma mídia (imagem/vídeo) para a denúncia.");
                updateDescription.focus();
                return;
            }

            let denuncias = getDenunciasFromStorage();
            // 'denunciaParaEdicao.timeline' já foi atualizada em memória pelo btnAddTimelineEvent
            const dadosDenunciaAtualizada = {
                ...denunciaParaEdicao, // Inclui a timeline potencialmente atualizada
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
                // Se for uma nova denúncia e nenhum evento foi adicionado manualmente,
                // adiciona o evento "Denúncia Criada"
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
            window.location.href = 'denuncias.html';
        });
    }
    carregarDadosDenuncia();
}

console.log("Fim da execução do script.js. Página atual:", nomePaginaAtual);