
const apiKey = 'AIzaSyCXaSAFrF6bVb5s5eI2uQDTyE231PgkVbw';

const palavrasChave = [
  "buracos na rua Belo Horizonte",
  "esgoto a céu aberto BH",
  "poste danificado BH",
  "alagamento BH",
  "iluminação pública queimada BH",
  "entulho na rua BH",
  "enchente em BH",
  "semaforo quebrado BH"
];

let videoIds = [];
let player;
let currentIndex = 0;

// Função chamada automaticamente pela API do YouTube quando o script dela termina de carregar
function onYouTubeIframeAPIReady() {
  buscarVideosMultiplasPalavras();
}

async function buscarVideosMultiplasPalavras() {
  videoIds = []; // Limpa a lista para novas buscas
  const publishedAfter = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(); // Busca vídeos do último mês

  for (let palavra of palavrasChave) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=2&q=${encodeURIComponent(palavra)}&regionCode=BR&relevanceLanguage=pt&publishedAfter=${publishedAfter}&order=relevance&key=${apiKey}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const ids = data.items.map(item => item.id.videoId).filter(Boolean);
      videoIds.push(...ids);
    } catch (err) {
      console.error(`Erro ao buscar vídeos para "${palavra}":`, err);
    }
  }


  videoIds = [...new Set(videoIds)];
  console.log(`Encontrados ${videoIds.length} vídeos.`);

  if (videoIds.length > 0) {
    iniciarPlayer();
  } else {
    document.getElementById('player').innerHTML = '<p style="text-align:center;">Nenhum vídeo recente encontrado para os temas.</p>';
    console.error("Nenhum vídeo encontrado para iniciar o player.");
  }
}

function iniciarPlayer() {
  if (player) {
    // Se o player já existe, apenas carrega a nova lista de vídeos
    player.loadPlaylist(videoIds);
    return;
  }
  
  // Cria um novo player
  player = new YT.Player('player', {
  
    videoId: videoIds[currentIndex],
    playerVars: {
      'autoplay': 1,
      'mute': 1, 
      'controls': 1, 
      'rel': 0, 
      'playlist': videoIds.join(','), 
      'loop': 1,
      'modestbranding': 1
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  console.log("Player pronto e tocando.");
}