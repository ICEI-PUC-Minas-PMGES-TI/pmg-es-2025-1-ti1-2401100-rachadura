let miniMap, fullMap;

const denuncias = [
  {
    descricao: 'Rachadura no muro de um prédio na Av. Afonso Pena.',
    lat: -19.9255,
    lng: -43.9387,
    imagem: '../imgs/1.jpeg'
  },
  {
    descricao: 'Rachadura na rua em frente à Praça da Liberdade.',
    lat: -19.9290,
    lng: -43.9385,
    imagem: '../imgs/2.jpeg'
  },
  {
    descricao: 'Rachadura na calçada próxima ao Parque Municipal.',
    lat: -19.9218,
    lng: -43.9370,
    imagem: '../imgs/3.jpeg'
  },
  {
    descricao: 'Fissura em poste na Rua da Bahia.',
    lat: -19.9224,
    lng: -43.9382,
    imagem: '../imgs/4.jpeg'
  },
  {
    descricao: 'Rachadura lateral em prédio comercial.',
    lat: -19.9235,
    lng: -43.9388,
    imagem: '../imgs/5.jpeg'
  },
  {
    descricao: 'Buraco crescente com rachaduras na Rua dos Guajajaras.',
    lat: -19.9236,
    lng: -43.9361,
    imagem: '../imgs/6.jpeg'
  },
  {
    descricao: 'Rachadura no muro de escola pública.',
    lat: -19.9230,
    lng: -43.9335,
    imagem: '../imgs/7.jpeg'
  }
];

function initMaps() {
  const centerCoords = { lat: -19.9288, lng: -43.9378 };

  miniMap = new google.maps.Map(document.getElementById("miniMap"), {
    center: centerCoords,
    zoom: 15,
  });

  fullMap = new google.maps.Map(document.getElementById("fullMap"), {
    center: centerCoords,
    zoom: 15,
  });

  const modal = document.getElementById("mapModal");
  const closeModal = document.querySelector(".close");

  // Abrir mapa maior ao clicar no mapa pequeno
  document.getElementById("miniMap").addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Fechar modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Criar marcadores em ambos os mapas
  denuncias.forEach((denuncia) => {
    const content = `
      <div style="max-width: 200px;">
        <p>${denuncia.descricao}</p>
        <img src="${denuncia.imagem}" alt="Imagem da denúncia" style="width: 100%; margin-top: 5px;">
      </div>
    `;

    const infoWindow = new google.maps.InfoWindow({
      content: content,
    });

    // Criar marcador no miniMap
    const markerMini = new google.maps.Marker({
      position: { lat: denuncia.lat, lng: denuncia.lng },
      map: miniMap,
    });

    markerMini.addListener("click", () => {
      infoWindow.open(miniMap, markerMini);
    });

    // Criar marcador no fullMap.
    const markerFull = new google.maps.Marker({
      position: { lat: denuncia.lat, lng: denuncia.lng },
      map: fullMap,
    });

    markerFull.addListener("click", () => {
      infoWindow.open(fullMap, markerFull);
    });
  });
}
