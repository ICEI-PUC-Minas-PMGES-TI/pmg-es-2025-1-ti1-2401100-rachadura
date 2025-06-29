Promise.all([
  fetch('/api/denuncias').then(r => r.json()),
  fetch('/api/usuarios').then(r => r.json())
]).then(([denuncias, usuarios]) => {
  // Mapeia usuários por ID para acesso rápido
  const usuariosMap = {};
  usuarios.forEach(u => { usuariosMap[u.id] = u; });

  // Função para retornar a imagem principal em qualquer formato
  function obterImagemPrincipal(denuncia) {
    let img = (denuncia.midias && denuncia.midias[0]) ||
              denuncia.imagem ||
              denuncia.imagem_denuncia ||
              null;
    if (!img) return 'https://placehold.co/400x200?text=Denúncia';

    if (img.startsWith('data:image/')) return img; // Base64
    if (img.startsWith('http')) return img;        // URL externa
    if (!img.includes('/')) return `/assets/img/${img}`; // Arquivo local (nome simples)
    return img; // Caminho relativo
  }

  denuncias.forEach(denuncia => {
    const usuario = usuariosMap[denuncia.usuarioId] || {
      nome: "Usuário Desconhecido",
      foto_perfil: "https://placehold.co/32x32?text=U"
    };

    // Endereço formatado: rua, bairro, cidade
    const end = denuncia.endereco || {};
    const enderecoFormatado = `${end.logradouro || ""}, ${end.bairro || ""}, ${end.cidade || ""}`;

    const imagemCard = obterImagemPrincipal(denuncia);

    const card = document.createElement('div');
    card.className = 'cartao';
    card.innerHTML = `
      <div class="perfil">
        <img src="${usuario.foto_perfil}" alt="Perfil" class="icone" style="width:32px; height:32px; border-radius:50%;">
        <span class="usuario">${usuario.nome}</span>
      </div>
      <img src="${imagemCard}" class="imagem-denuncia" alt="Imagem denúncia" style="width:100%;max-width:420px;border-radius:10px;margin:12px 0;">
      <div class="descricao">${denuncia.descricao || ''}</div>
      <div class="localizacao">${enderecoFormatado}</div>
      <div class="categoria">${denuncia.categoria ? 'Categoria: ' + denuncia.categoria : ''}</div>
    `;
    // Evento de clique para abrir detalhes/comentários
    card.addEventListener('click', () => {
      window.location.href = `/views/comentarios.html?id=${encodeURIComponent(denuncia.id)}`;
    });

    document.getElementById('feed').appendChild(card);
  });
});
