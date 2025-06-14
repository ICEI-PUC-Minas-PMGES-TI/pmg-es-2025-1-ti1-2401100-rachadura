const apiKey = 'AIzaSyClCYPKTgtXacIp3aB7rDrcldR62Ht8JCs';


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


async function buscarVideosMultiplasPalavras() {
  const publishedAfter = '2025-01-01T00:00:00Z';

  for (let palavra of palavrasChave) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=3&q=${encodeURIComponent(palavra)}&regionCode=BR&relevanceLanguage=pt&publishedAfter=${publishedAfter}&order=date&key=${apiKey}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const ids = data.items.map(item => item.id.videoId).filter(Boolean);
      videoIds.push(...ids);
    } catch (err) {
      console.error(`Erro ao buscar vídeos para "${palavra}":`, err);
    }
  }

  if (videoIds.length > 0) {
    iniciarPlayer();
  } else {
    console.error("Nenhum vídeo encontrado.");
  }
}

// Função chamada pela API do YouTube
function onYouTubeIframeAPIReady() {
  buscarVideosMultiplasPalavras();
}

// Inicia o player com o primeiro vídeo
function iniciarPlayer() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: videoIds[currentIndex],
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      modestbranding: 1,
      showinfo: 0,
      rel: 0
    },
    events: {
      onReady: onPlayerReady
    }
  });
}


function onPlayerReady(event) {
  event.target.playVideo();

  setInterval(() => {
    currentIndex = (currentIndex + 1) % videoIds.length;
    player.loadVideoById(videoIds[currentIndex]);
  }, 10000); 
}

