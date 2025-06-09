// Referência ao container de notícias (em noticias.html)
const noticiasContainer = document.getElementById('noticias-container');

// Referências aos elementos de detalhes (em detalhes_noticia.html)
const tituloNoticia = document.getElementById('titulo-noticia');
const dataNoticia = document.getElementById('data-noticia');
const categoriaNoticia = document.getElementById('categoria-noticia');
const conteudoNoticia = document.getElementById('conteudo-noticia');
const linkOriginal = document.getElementById('link-original');

// Página principal: carregar cards de notícias
if (noticiasContainer) {
  let todasNoticias = [];
  const filtroSelect = document.getElementById('categoria-filtro');

  // Função para mostrar notícias filtradas
  function mostrarNoticiasFiltradas() {
    const categoria = filtroSelect.value;
    noticiasContainer.innerHTML = '';
    const filtradas = (categoria === 'todas')
      ? todasNoticias
      : todasNoticias.filter(n => n.categoria === categoria);

    if (filtradas.length === 0) {
      noticiasContainer.innerHTML = `<p>Nenhuma notícia encontrada para esta categoria.</p>`;
      return;
    }

    filtradas.forEach(noticia => {
      const card = document.createElement('div');
      card.className = 'noticia-card';
      card.onclick = () => {
        window.location.href = `detalhes_noticia.html?id=${noticia.id}`;
      };

      card.innerHTML = `
        <h2>${noticia.titulo}</h2>
        <p class="categoria"><strong>Categoria:</strong> ${noticia.categoria}</p>
        <p class="resumo">${noticia.resumo}</p>
      `;
      noticiasContainer.appendChild(card);
    });
  }

  // Função para preencher o filtro de categorias
  function preencherFiltroCategorias() {
    const categorias = [...new Set(todasNoticias.map(n => n.categoria))];
    filtroSelect.innerHTML = `<option value="todas">Todas as categorias</option>`;
    categorias.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      filtroSelect.appendChild(option);
    });
  }

  // Busca todas as notícias e inicializa filtro
  fetch('http://localhost:3000/noticias')
    .then(response => response.json())
    .then(noticias => {
      todasNoticias = noticias;
      preencherFiltroCategorias();
      mostrarNoticiasFiltradas();
    })
    .catch(error => {
      console.error('Erro ao carregar as notícias:', error);
      noticiasContainer.innerHTML = `<p>Não foi possível carregar as notícias.</p>`;
    });

  // Listener do filtro
  filtroSelect.addEventListener('change', mostrarNoticiasFiltradas);
}


// Página de detalhes: carregar conteúdo da notícia específica
if (tituloNoticia && dataNoticia && categoriaNoticia && conteudoNoticia && linkOriginal) {
  const params = new URLSearchParams(window.location.search);
  const noticiaId = params.get('id');

  if (noticiaId) {
    fetch(`http://localhost:3000/noticias/${noticiaId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Notícia não encontrada');
        }
        return response.json();
      })
      .then(noticia => {
        tituloNoticia.textContent = noticia.titulo;
        dataNoticia.textContent = noticia.data;
        categoriaNoticia.textContent = noticia.categoria;
        conteudoNoticia.textContent = noticia.conteudo;
        linkOriginal.href = noticia.link;
      })
      .catch(error => {
        console.error('Erro ao carregar detalhes da notícia:', error);
        document.querySelector('main.container').innerHTML = `<p>Não foi possível carregar a notícia.</p>`;
      });
  }
}
