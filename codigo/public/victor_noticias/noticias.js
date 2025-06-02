const apiKey = 'SUA_CHAVE_DE_API'; 
let player;


function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: '', 
  });
}


function buscarVideos() {
  const termo = document.getElementById('busca').value;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(termo)}&key=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const resultados = document.getElementById('resultados');
      resultados.innerHTML = ''; 

      data.items.forEach(video => {
        const videoId = video.id.videoId;
        const titulo = video.snippet.title;

        const btn = document.createElement('button');
        btn.textContent = titulo;
        btn.onclick = () => player.loadVideoById(videoId);

        resultados.appendChild(btn);
      });
    })
}


window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
window.buscarVideos = buscarVideos;
