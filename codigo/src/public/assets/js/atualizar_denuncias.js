document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DO DOM ---
    const tituloDisplay = document.getElementById('denuncia-titulo-display');
    const descricaoDisplay = document.getElementById('denuncia-descricao-display');
    const categoriaDisplay = document.getElementById('denuncia-categoria-display');
    const enderecoDisplay = document.getElementById('denuncia-endereco-display');
    const midiasExistentesContainer = document.getElementById('midias-existentes-container');
    const timelineContainer = document.getElementById('denuncia-timeline-container');
    const novasMidiasPreview = document.getElementById('novas-midias-preview');

    // Controles de Edição
    const formAtualizacao = document.getElementById('form-atualizacao');
    const btnAddMidia = document.getElementById('btn-add-midia');
    const midiaInput = document.getElementById('midia-input');
    const timelineSection = document.getElementById('timeline-section');
    const addMediaSection = document.getElementById('add-media-section');
    const statusSelect = document.getElementById('timeline-new-status-select');
    const notasTextarea = document.getElementById('timeline-new-notes');
    
    // Botões de Ação
    const btnSalvar = document.getElementById('btn-save');
    const btnExcluir = document.getElementById('btn-delete');
    const btnVoltar = document.getElementById('btn-back');

    // --- ESTADO DA APLICAÇÃO ---
    let denunciaAtual = {};
    let novasMidias = []; 

    // --- FUNÇÕES ---

    const getDenunciaId = () => new URLSearchParams(window.location.search).get('id');
    const formatarEndereco = (end) => !end ? "Endereço não informado." : `${end.logradouro||''}, ${end.numero||'s/n'} - ${end.bairro||''}, ${end.cidade||''} - ${end.estado||''}`;
    const formatarTimestamp = (ts) => !ts ? 'Data indisponível' : new Date(ts).toLocaleString('pt-BR');

    const renderizarPagina = () => {
        tituloDisplay.textContent = denunciaAtual.titulo || "Título não encontrado";
        descricaoDisplay.textContent = denunciaAtual.descricao || "Esta denúncia não possui uma descrição detalhada.";
        categoriaDisplay.textContent = `Categoria: ${denunciaAtual.categoria || "Não informada"}`;
        enderecoDisplay.textContent = `Local: ${formatarEndereco(denunciaAtual.endereco)}`;

        midiasExistentesContainer.innerHTML = '';
        if (denunciaAtual.midias && denunciaAtual.midias.length > 0) {
            denunciaAtual.midias.forEach(url => {
                midiasExistentesContainer.innerHTML += `<div class="media-item"><img src="${url}" alt="Mídia da denúncia"></div>`;
            });
        }

        timelineContainer.innerHTML = '';
        if (denunciaAtual.timeline && denunciaAtual.timeline.length > 0) {
            [...denunciaAtual.timeline].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).forEach(ev => {
                timelineContainer.innerHTML += `
                    <div class="timeline-item">
                        <div class="timeline-item-status">${ev.status}</div>
                        <div class="timeline-item-timestamp">${formatarTimestamp(ev.timestamp)}</div>
                        ${ev.notas ? `<div class="timeline-item-notes">${ev.notas}</div>` : ''}
                    </div>
                `;
            });
        }
    };

    const fileToBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const renderizarPreviewNovasMidias = () => {
        novasMidiasPreview.innerHTML = '';
        novasMidias.forEach((midia, index) => {
            novasMidiasPreview.innerHTML += `
                <div class="media-item">
                    <img src="${midia.base64}" alt="Preview da nova mídia">
                    <button type="button" class="btn-remove-nova-midia" data-index="${index}">X</button>
                </div>
            `;
        });
        document.querySelectorAll('.btn-remove-nova-midia').forEach(btn => 
            btn.addEventListener('click', (e) => {
                novasMidias.splice(parseInt(e.target.dataset.index, 10), 1);
                renderizarPreviewNovasMidias();
            })
        );
    };

    const carregarDenuncia = async (id) => {
        try {
            const response = await axios.get(`https://rachadura.onrender.com/api/denuncias/${id}`);
            denunciaAtual = response.data;
            if (denunciaAtual.usuarioId === localStorage.getItem('usuarioId')) {
                btnSalvar.style.display = 'block';
                btnExcluir.style.display = 'block';
                timelineSection.style.display = 'block';
                addMediaSection.style.display = 'block';
            }
            renderizarPagina();
        } catch (error) {
            console.error("Erro ao carregar a denúncia:", error);
            tituloDisplay.textContent = "Denúncia não encontrada.";
        }
    };

    // --- LÓGICA DE EVENTOS ---

    formAtualizacao.addEventListener('submit', async (e) => {
        e.preventDefault();
        const novoStatus = statusSelect.value;
        const novasNotas = notasTextarea.value.trim();
        const novasMidiasUrls = novasMidias.map(m => m.base64);

        if (!novoStatus) {
            alert("Para salvar uma atualização, você deve selecionar um novo status.");
            return;
        }

        const novoEventoTimeline = {
            status: novoStatus,
            timestamp: new Date().toISOString(),
            notas: novasNotas || "",
            midias: novasMidiasUrls
        };
        denunciaAtual.timeline = denunciaAtual.timeline || [];
        denunciaAtual.timeline.push(novoEventoTimeline);
        
        try {
            await axios.put(`https://rachadura.onrender.com/api/denuncias/${denunciaAtual.id}`, denunciaAtual);
            alert("Denúncia atualizada com sucesso!");
            window.location.href = `/views/comentarios.html?id=${denunciaAtual.id}`;
        } catch (error) {
            console.error("Erro ao salvar as alterações:", error);
            denunciaAtual.timeline.pop(); // Remove o evento adicionado localmente em caso de erro
            alert("Não foi possível salvar as alterações. Tente novamente.");
        }
    });

    btnExcluir.addEventListener('click', async () => {
        if (confirm("Tem certeza que deseja excluir esta denúncia?")) {
            try {
                await axios.delete(`https://rachadura.onrender.com/api/denuncias/${denunciaAtual.id}`);
                alert("Denúncia excluída com sucesso.");
                window.location.href = '/views/home_page.html';
            } catch (error) {
                alert("Não foi possível excluir a denúncia.");
            }
        }
    });
    
    btnAddMidia.addEventListener('click', () => midiaInput.click());
    midiaInput.addEventListener('change', async (e) => {
        if (e.target.files.length > 0) {
            for (const file of Array.from(e.target.files)) {
                novasMidias.push({ file, base64: await fileToBase64(file) });
            }
            renderizarPreviewNovasMidias();
        }
    });
    
    btnVoltar.addEventListener('click', () => window.history.back());

    const denunciaId = getDenunciaId();
    if (denunciaId) carregarDenuncia(denunciaId);
    else window.location.href = '/views/home_page.html';
});