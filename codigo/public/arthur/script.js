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
        // MODIFICADO: Exemplo de link de imagem placeholder
        imagem: "https://picsum.photos/seed/vazamentoflores/400/300", 
        video: null,
        timeline: [
            { status: "Denúncia Criada", timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), notas: "Denúncia registrada automaticamente no sistema." },
            { status: "Em Análise", timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), notas: "Equipe ciente, aguardando técnico." }
        ]
    },
    {
        id: generateUniqueId(),
        titulo: "Semáforo com Defeito no Cruzamento Principal",
        descricao: "O semáforo do cruzamento da Av. Brasil com a Rua México está intermitente (piscando amarelo) há várias horas, causando confusão e risco de acidentes, especialmente em horários de pico.",
        imagem: null, 
        // MODIFICADO: Exemplo de link de vídeo placeholder
        video: "https://placehold.co/600x400.mp4?text=VideoSemaforoDefeito",
        timeline: [
            { status: "Denúncia Criada", timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), notas: "Denúncia registrada automaticamente no sistema." }
        ]
    },
    {
        id: generateUniqueId(),
        titulo: "Terreno com Matagal e Entulho",
        descricao: "Um terreno na Rua das Acácias, ao lado do posto de saúde, está com mato muito alto e acúmulo de entulho, o que pode ser foco de mosquitos da dengue e outros vetores. Moradores pedem limpeza.",
        imagem: null, 
        video: null,
        timeline: [
            { status: "Denúncia Criada", timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), notas: "Denúncia registrada automaticamente no sistema." }
        ]
    }
];

if (nomePaginaAtual === 'denuncias.html' || nomePaginaAtual === '' || nomePaginaAtual === 'index.html') {
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
            // Limitar descrição no card
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

    // MODIFICADO: Referência para o select de status
    const timelineNewStatusSelect = document.getElementById('timeline-new-status-select');
    const timelineNewNotesInput = document.getElementById('timeline-new-notes');
    const btnAddTimelineEvent = document.getElementById('btn-add-timeline-event');

    let currentDenunciaId = null;
    let denunciaParaEdicao = {
        titulo: '',
        descricao: '',
        imagem: null, // Armazenará a URL da imagem
        video: null,  // Armazenará a URL do vídeo
        timeline: []
    };

    const params = new URLSearchParams(window.location.search);
    currentDenunciaId = params.get('id');

    const updateSelectedFilesUI = () => {
        if (!selectedFilesInfoEl) return;
        let infoHTML = '';
        if (denunciaParaEdicao.imagem) {
            // MODIFICADO: Mostrar link clicável para imagem
            infoHTML += `<p>Imagem: <a href="${denunciaParaEdicao.imagem}" target="_blank">${denunciaParaEdicao.imagem}</a> <button class="btn-remove-media" data-type="image">Remover</button></p>`;
        }
        if (denunciaParaEdicao.video) {
            // MODIFICADO: Mostrar link clicável para vídeo
            infoHTML += `<p>Vídeo: <a href="${denunciaParaEdicao.video}" target="_blank">${denunciaParaEdicao.video}</a> <button class="btn-remove-media" data-type="video">Remover</button></p>`;
        }
        selectedFilesInfoEl.innerHTML = infoHTML || '<p>Nenhuma mídia adicionada.</p>';

        document.querySelectorAll('.btn-remove-media').forEach(button => {
            button.addEventListener('click', (e) => {
                const type = e.target.dataset.type;
                if (type === 'image') {
                    denunciaParaEdicao.imagem = null;
                    if (imageInput) imageInput.value = ''; // Limpa o file input
                } else if (type === 'video') {
                    denunciaParaEdicao.video = null;
                    if (videoInput) videoInput.value = ''; // Limpa o file input
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
        updateSelectedFilesUI(); // Atualiza UI de mídias (agora com links)
        renderizarTimeline(denunciaParaEdicao.timeline);
    };

    if (btnAddTimelineEvent) {
        btnAddTimelineEvent.addEventListener('click', () => {
            // MODIFICADO: Ler valor do select
            const novoStatus = timelineNewStatusSelect.value;
            const novasNotas = timelineNewNotesInput.value.trim();

            if (!novoStatus) { // Verifica se uma opção válida foi selecionada
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

            // MODIFICADO: Limpar campos (resetar select)
            timelineNewStatusSelect.selectedIndex = 0; 
            timelineNewNotesInput.value = '';
            console.log("Novo evento adicionado à timeline (em memória):", novoEventoTimeline);
        });
    }

    if (btnAddImage && imageInput) {
        btnAddImage.addEventListener('click', () => imageInput.click());
        imageInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                // MODIFICADO: Gerar link placeholder para imagem
                const seed = file.name.replace(/[^a-zA-Z0-9]/g, "") + Date.now(); // Remove caracteres especiais e adiciona timestamp para unicidade
                denunciaParaEdicao.imagem = `https://picsum.photos/seed/${seed}/400/300`;
                console.log(`Link da imagem gerado (placeholder): ${denunciaParaEdicao.imagem}`);
                updateSelectedFilesUI();
                // Não é ideal limpar o event.target.value aqui se quiser reusar o mesmo arquivo sem re-selecionar,
                // mas para o fluxo de "sempre novo arquivo", está ok.
            }
        });
    }

    if (btnAddVideo && videoInput) {
        btnAddVideo.addEventListener('click', () => videoInput.click());
        videoInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                // MODIFICADO: Gerar link placeholder para vídeo
                denunciaParaEdicao.video = `https://placehold.co/600x400.mp4?text=Video:%20${encodeURIComponent(file.name)}`;
                console.log(`Link do vídeo gerado (placeholder): ${denunciaParaEdicao.video}`);
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
            const dadosDenunciaAtualizada = {
                ...denunciaParaEdicao, // Inclui imagem/video como URLs e timeline atualizada
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
                        status: "Denúncia Criada", // Status inicial para novas denúncias
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