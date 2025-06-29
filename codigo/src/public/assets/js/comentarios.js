
const API = "https://rachadura.onrender.com/api";
const params = new URLSearchParams(window.location.search);
const denunciaId = params.get('id');
const usuarioId = localStorage.getItem("usuarioId");



function renderDenuncia(denuncia, usuariosMap) {
    if (!denuncia) {
        document.getElementById("denunciaDetalhe").innerHTML = "<p>Denúncia não encontrada.</p>";
        return;
    }
    const usuario = usuariosMap.get(denuncia.usuarioId) || { nome: "Desconhecido", foto_perfil: "https://placehold.co/32x32" };
    const end = denuncia.endereco || {};
    const enderecoFormatado = [end.logradouro, end.bairro, end.cidade].filter(Boolean).join(", ");

    const likes = denuncia.likes || [];
    const dislikes = denuncia.dislikes || [];
    const jaCurtiu = usuarioId && likes.includes(usuarioId);
    const jaDescurtiu = usuarioId && dislikes.includes(usuarioId);

    const midiaPrincipalHtml = `<img src="${obterImagemPrincipal(denuncia)}" class="imagem-principal-denuncia" alt="Imagem da Denúncia">`;


    const acoesLikeHtml = usuarioId ? `
        <button class="like-btn${jaCurtiu ? ' ativo' : ''}" id="likeBtn" title="Curtir"><i class="bi bi-hand-thumbs-up-fill"></i><span>${likes.length}</span></button>
        <button class="dislike-btn${jaDescurtiu ? ' ativo' : ''}" id="dislikeBtn" title="Não curtir"><i class="bi bi-hand-thumbs-down-fill"></i><span>${dislikes.length}</span></button>
    ` : `<p class="text-muted small">Faça login para avaliar esta denúncia.</p>`;


    const acoesAdminHtml = usuarioId === denuncia.usuarioId ? `
        <button class="btn btn-primary btn-sm me-2" id="editBtn">Adicionar Atualização</button>
        <button class="btn btn-outline-secondary btn-sm" id="deleteBtn">Excluir</button>
    ` : "";

    document.getElementById("denunciaDetalhe").innerHTML = `
      <div class="card border-0 mb-3" style="max-width: 620px; margin:auto;">
        <div class="card-body">
          <div class="d-flex align-items-center mb-3">
            <img src="${usuario.foto_perfil}" class="rounded-circle me-3" width="48" height="48" alt="Usuário">
            <div>
              <h5 class="card-title mb-0">${denuncia.titulo || "-"}</h5>
              <small class="text-muted">${usuario.nome}</small>
            </div>
          </div>
          ${midiaPrincipalHtml}
          <p class="card-text mt-2">${denuncia.descricao || ""}</p>
          <div class="mb-2"><span class="fw-semibold">Endereço:</span> ${enderecoFormatado || "-"}</div>
          <div class="mb-3"><span class="fw-semibold">Categoria:</span> ${denuncia.categoria || "-"}</div>
          <div class="like-dislike-group">${acoesLikeHtml}</div>
          <div class="mt-3">${acoesAdminHtml}</div>
        </div>
      </div>`;


    if (usuarioId) {
        document.getElementById("likeBtn")?.addEventListener('click', () => votarLikeDislike(true));
        document.getElementById("dislikeBtn")?.addEventListener('click', () => votarLikeDislike(false));
    }
    if (usuarioId === denuncia.usuarioId) {
        document.getElementById("deleteBtn")?.addEventListener('click', deletarDenuncia);
        document.getElementById("editBtn")?.addEventListener('click', () => window.location.href = `/views/atualizar_denuncia.html?id=${denuncia.id}`);
    }
}

function renderTimeline(denuncia) {

    const timelineContainer = document.getElementById("timelineContainer");
    if (!denuncia.timeline || !denuncia.timeline.length) {
        timelineContainer.innerHTML = "<p>Sem eventos registrados nesta denúncia.</p>";
        return;
    }
    let html = `<h3>Histórico (Timeline)</h3><div class="timeline">`;
    const timelineOrdenada = [...denuncia.timeline].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    timelineOrdenada.forEach(ev => {
        let midiasHtml = "";
        if (ev.midias && ev.midias.length > 0) {
            midiasHtml = `<div class="midias-timeline">`;
            ev.midias.forEach(url => {
                midiasHtml += `<img src="${url}" alt="Mídia do evento ${ev.status}" title="Clique para ampliar">`;
            });
            midiasHtml += `</div>`;
        }
        html += `
          <div class="timeline-item">
            <span class="timeline-status">${ev.status}</span>
            <span class="timeline-date">${ev.timestamp ? new Date(ev.timestamp).toLocaleString('pt-BR') : ""}</span>
            <div class="timeline-notas">${ev.notas || ""}</div>
            ${midiasHtml}
          </div>
        `;
    });
    html += "</div>";
    timelineContainer.innerHTML = html;
}

function renderComentarios(comentarios, usuariosMap) {

    const lista = document.getElementById("listaComentarios");
    if (!comentarios.length) {
        lista.innerHTML = "<p>Seja o primeiro a comentar!</p>";
        return;
    }
    let comentariosHtml = '';
    comentarios.forEach(c => {
        const user = usuariosMap.get(c.usuarioId) || { nome: "Desconhecido", foto_perfil: "https://placehold.co/32x32" };
        comentariosHtml += `
            <div class="comentario-bloco">
                <img src="${user.foto_perfil}" class="foto-comentario" alt="Usuário">
                <span class="usuario-comentario">${user.nome}</span>
                <span class="data-comentario">${c.data ? new Date(c.data).toLocaleString('pt-BR') : ""}</span>
                <div class="texto-comentario">${c.texto}</div>
            </div>
        `;
    });
    lista.innerHTML = comentariosHtml;
}



async function votarLikeDislike(like) {

    if (!verificarLoginERedirecionar("Você precisa estar logado para avaliar.")) {
        return;
    }

    const res = await fetch(`${API}/denuncias/${denunciaId}`);
    const denuncia = await res.json();
    let likes = denuncia.likes || [];
    let dislikes = denuncia.dislikes || [];
    if (like) {
        dislikes = dislikes.filter(u => u !== usuarioId);
        likes.includes(usuarioId) ? likes = likes.filter(u => u !== usuarioId) : likes.push(usuarioId);
    } else {
        likes = likes.filter(u => u !== usuarioId);
        dislikes.includes(usuarioId) ? dislikes = dislikes.filter(u => u !== usuarioId) : dislikes.push(usuarioId);
    }
    await fetch(`${API}/denuncias/${denunciaId}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ likes, dislikes })
    });
    const usuariosMap = new Map((await (await fetch(`${API}/usuarios`)).json()).map(u => [u.id, u]));
    renderDenuncia(await (await fetch(`${API}/denuncias/${denunciaId}`)).json(), usuariosMap);
}

async function deletarDenuncia() {

    if (!confirm("Deseja realmente excluir esta denúncia?")) return;
    await fetch(`${API}/denuncias/${denunciaId}`, { method: "DELETE" });
    alert("Denúncia removida.");
    window.location.href = "/views/feed.html";
}

async function enviarComentario() {

    if (!verificarLoginERedirecionar("Você precisa estar logado para comentar.")) {
        return;
    }
    const texto = document.getElementById("novoComentario").value.trim();
    if (!texto) {
        alert("Por favor, escreva seu comentário.");
        return;
    }
    await fetch(`${API}/comentarios`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ denunciaId, usuarioId, texto, data: new Date().toISOString() })
    });
    document.getElementById("novoComentario").value = "";
    const [usuarios, comentarios] = await Promise.all([
        (await fetch(`${API}/usuarios`)).json(),
        (await fetch(`${API}/comentarios?denunciaId=${denunciaId}`)).json()
    ]);
    renderComentarios(comentarios, new Map(usuarios.map(u => [u.id, u])));
}


document.addEventListener("DOMContentLoaded", async () => {
    if (!denunciaId) {
        document.body.innerHTML = "<h1>Erro: ID da denúncia não fornecido.</h1>";
        return;
    }
    try {
        const [denuncia, usuarios, comentarios] = await Promise.all([
            fetch(`${API}/denuncias/${denunciaId}`).then(res => res.json()),
            fetch(`${API}/usuarios`).then(res => res.json()),
            fetch(`${API}/comentarios?denunciaId=${denunciaId}`).then(res => res.json())
        ]);
        const usuariosMap = new Map(usuarios.map(u => [u.id, u]));
        renderDenuncia(denuncia, usuariosMap);
        renderTimeline(denuncia);
        renderComentarios(comentarios, usuariosMap);

        const formComentario = document.getElementById("formComentario");
        formComentario.addEventListener('submit', e => {
            e.preventDefault();
            enviarComentario();
        });

        // Mostra o formulário de comentário apenas se o usuário estiver logado.
        if (usuarioId) {
            formComentario.style.display = "flex";
        }

    } catch (error) {
        console.error("Falha ao carregar a página da denúncia:", error);
        document.getElementById("denunciaDetalhe").innerHTML = "<h2>Não foi possível carregar a denúncia.</h2>";
    }
});

// A função obterImagemPrincipal precisa estar disponível.
function obterImagemPrincipal(denuncia) {
    let img = (denuncia.midias && denuncia.midias[0]) || denuncia.imagem || denuncia.imagem_denuncia || null;
    if (!img) return 'https://placehold.co/400x200?text=Denúncia';
    if (img.startsWith('data:image/')) return img;
    if (img.startsWith('http')) return img;
    if (!img.includes('/')) return `/assets/img/${img}`;
    return img;
}