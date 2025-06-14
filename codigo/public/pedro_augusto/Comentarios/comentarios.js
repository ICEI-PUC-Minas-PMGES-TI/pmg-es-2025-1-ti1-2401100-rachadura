// Dados do feed com as imagens atualizadas
const feedData = {
  "feed": [
    {
      "id": 1,
      "usuario": "joao_silva",
      "foto_perfil": "https://randomuser.me/api/portraits/men/1.jpg",
      "imagem_denuncia": "https://www.diariozonanorte.com.br/wp-content/uploads/2023/03/buraco.jpg",
      "descricao": "Buraco enorme na Rua dos Goitacazes, próximo ao número 1200. Difícil para carros e perigoso para pedestres.",
      "localizacao": "Rua dos Goitacazes, Centro",
      "likes": 3,
      "dislikes": 2,
      "userReaction": null,
      "comentarios": [
        {
          "id": 2,
          "usuario": "maria_oliveira",
          "foto_perfil": "https://randomuser.me/api/portraits/women/2.jpg",
          "texto": "Já faz mais de uma semana que está assim!",
          "data": "2025-05-10T14:30:00"
        },
        {
          "id": 3,
          "usuario": "ana_souza",
          "foto_perfil": "https://randomuser.me/api/portraits/women/4.jpg",
          "texto": "Vou acionar a prefeitura sobre isso.",
          "data": "2025-05-11T09:15:00"
        }
      ]
    },
    {
      "id": 2,
      "usuario": "maria_oliveira",
      "foto_perfil": "https://randomuser.me/api/portraits/women/2.jpg",
      "imagem_denuncia": "https://cdn.prod.website-files.com/620c025f07569b2d9353cfde/620d423066dd4c947b6bf8ad_Como-Localizar-Vazamento-Agua-1.jpg",
      "descricao": "Vazamento de água constante, já está formando poça na calçada.",
      "localizacao": "Rua Padre Eustáquio, bairro Padre Eustáquio",
      "likes": 8,
      "dislikes": 1,
      "userReaction": null,
      "comentarios": []
    }
  ]
};

// Função para renderizar o feed
function renderFeed() {
  const feedContainer = document.querySelector('.feed-container');
  feedContainer.innerHTML = '';
  
  feedData.feed.forEach(post => {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    
    postElement.innerHTML = `
      <div class="post-header">
        <img src="${post.foto_perfil}" alt="${post.usuario}" class="post-avatar">
        <div>
          <div class="post-user">${post.usuario}</div>
          <div class="post-location">${post.localizacao}</div>
        </div>
      </div>
      <p class="post-description">${post.descricao}</p>
      <div class="post-image-container">
        <img src="${post.imagem_denuncia}" alt="Denúncia" class="post-image" onerror="this.src='https://via.placeholder.com/600x400?text=Imagem+não+disponível'">
      </div>
      <div class="reaction-buttons">
        <button class="reaction-btn ${post.userReaction === 'like' ? 'active' : ''}" 
                onclick="handleReaction(${post.id}, 'like')">
          <svg class="reaction-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z" />
          </svg>
          <span>${post.likes}</span>
        </button>
        <button class="reaction-btn ${post.userReaction === 'dislike' ? 'active' : ''}" 
                onclick="handleReaction(${post.id}, 'dislike')">
          <svg class="reaction-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,15H23V3H19M15,3H6C5.17,3 4.46,3.5 4.16,4.22L1.14,11.27C1.05,11.5 1,11.74 1,12V14A2,2 0 0,0 3,16H9.31L8.36,20.57C8.34,20.67 8.33,20.77 8.33,20.88C8.33,21.3 8.5,21.67 8.77,21.94L9.83,23L16.41,16.41C16.78,16.05 17,15.55 17,15V5C17,3.89 16.1,3 15,3Z" />
          </svg>
          <span>${post.dislikes}</span>
        </button>
      </div>
      <div class="comments-section" id="comments-${post.id}">
        <div class="comments-title">Comentários (${post.comentarios.length})</div>
        ${renderComments(post.comentarios)}
        <form class="comment-form" onsubmit="addComment(event, ${post.id})">
          <input type="text" class="comment-input" placeholder="Adicione um comentário..." required>
          <button type="submit" class="comment-submit">Enviar</button>
        </form>
      </div>
    `;
    
    feedContainer.appendChild(postElement);
  });
}

// Função para renderizar comentários
function renderComments(comments) {
  if (!comments || comments.length === 0) {
    return '<div class="no-comments">Nenhum comentário ainda. Seja o primeiro a comentar!</div>';
  }
  
  return comments.map(comment => `
    <div class="comment">
      <img src="${comment.foto_perfil}" alt="${comment.usuario}" class="comment-avatar">
      <div class="comment-content">
        <div class="comment-user">${comment.usuario}</div>
        <div class="comment-text">${comment.texto}</div>
        <div class="comment-date">${formatDate(comment.data)}</div>
      </div>
    </div>
  `).join('');
}

// Função para formatar data
function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
}

// Função para adicionar comentário
function addComment(event, postId) {
  event.preventDefault();
  const input = event.target.querySelector('.comment-input');
  const commentText = input.value.trim();
  
  if (commentText) {
    const post = feedData.feed.find(p => p.id === postId);
    
    const newComment = {
      id: Date.now(),
      usuario: "usuário_atual",
      foto_perfil: "https://randomuser.me/api/portraits/men/10.jpg",
      texto: commentText,
      data: new Date().toISOString()
    };
    
    post.comentarios.push(newComment);
    renderFeed();
    input.value = '';
  }
}

// Função para lidar com reações (like/dislike)
function handleReaction(postId, reaction) {
  const post = feedData.feed.find(p => p.id === postId);
  
  if (post.userReaction === reaction) {
    post[reaction + 's']--;
    post.userReaction = null;
  } 
  else if (post.userReaction) {
    post[post.userReaction + 's']--;
    post[reaction + 's']++;
    post.userReaction = reaction;
  }
  else {
    post[reaction + 's']++;
    post.userReaction = reaction;
  }
  
  renderFeed();
}

// Carrega o feed quando a página é aberta
document.addEventListener('DOMContentLoaded', renderFeed);