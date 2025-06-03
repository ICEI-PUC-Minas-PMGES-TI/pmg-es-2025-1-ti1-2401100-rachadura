const apiKey = 'AIzaSyClCYPKTgtXacIp3aB7rDrcldR62Ht8JCs'; 

let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: '',
  });
}

function buscarVideosPorCategoria() {
  const categoria = document.getElementById('categoria').value;
  const container = document.getElementById('botoes-videos');
  container.innerHTML = '';

  if (!categoria) return;

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(categoria)}&key=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.items || data.items.length === 0) {
        container.textContent = 'Nenhum vídeo encontrado.';
        return;
      }

      data.items
        .filter(item => item.id.kind === 'youtube#video')
        .forEach(video => {
          const videoId = video.id.videoId;
          const title = video.snippet.title;
          const thumbnail = video.snippet.thumbnails.medium.url;

          // Criar card do vídeo
          const videoDiv = document.createElement('div');
          videoDiv.style.margin = '15px 0';

          const img = document.createElement('img');
          img.src = thumbnail;
          img.alt = title;
          img.style.cursor = 'pointer';
          img.onclick = () => {
            player.loadVideoById(videoId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          };

          const titulo = document.createElement('p');
          titulo.textContent = title;
          titulo.style.margin = '5px 0';

          videoDiv.appendChild(img);
          videoDiv.appendChild(titulo);

          container.appendChild(videoDiv);
        });
    })
    .catch(err => {
      console.error('Erro ao buscar vídeos:', err);
      container.textContent = 'Erro ao carregar vídeos.';
    });
}
