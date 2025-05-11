let miniMap, fullMap;

function initMaps() {
  const centerCoords = { lat: -19.9208, lng: -43.9378 }; // Ponto central de Belo Horizonte

  // Inicializando o mini mapa
  miniMap = new google.maps.Map(document.getElementById("miniMap"), {
    center: centerCoords,
    zoom: 12,  // Ajustando o zoom para um valor menor (visão mais ampla)
    disableDefaultUI: true
  });

  // Inicializando o mapa completo no modal
  fullMap = new google.maps.Map(document.getElementById("fullMap"), {
    center: centerCoords,
    zoom: 13  // Zoom um pouco maior para o mapa completo
  });

  // Definindo as denúncias fictícias
  const denuncias = [
    {
      descricao: 'Rachadura no muro de um prédio na Av. Afonso Pena.',
      lat: -19.9205,
      lng: -43.9337
    },
    {
      descricao: 'Rachadura na rua em frente à Praça da Liberdade.',
      lat: -19.9290,
      lng: -43.9385
    }
  ];

  // Adicionando os marcadores no mapa
  denuncias.forEach(denuncia => {
    const marcador = new google.maps.Marker({
      position: { lat: denuncia.lat, lng: denuncia.lng },
      map: miniMap,
      title: denuncia.descricao
    });

    // Adicionando uma info window (janela com a descrição da denúncia) no marcador
    const infoWindow = new google.maps.InfoWindow({
      content: `<p>${denuncia.descricao}</p>`
    });

    marcador.addListener('click', function() {
      infoWindow.open(miniMap, marcador);
    });
  });

  // Centralizando os marcadores para garantir que sejam visíveis
  const bounds = new google.maps.LatLngBounds();
  denuncias.forEach(denuncia => {
    bounds.extend(new google.maps.LatLng(denuncia.lat, denuncia.lng));
  });
  miniMap.fitBounds(bounds);  // Ajusta o mapa para mostrar todos os marcadores
}

// Modal toggle
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById('mapModal');
  const closeBtn = document.querySelector('.close');

  document.getElementById('miniMap').addEventListener('click', () => {
    modal.style.display = 'block';
    google.maps.event.trigger(fullMap, "resize");  // Redimensionando o mapa
    fullMap.setCenter(miniMap.getCenter());  // Centralizando o mapa completo no mesmo ponto do mini mapa

    // Adicionando os marcadores no mapa completo
    const denuncias = [
      {
        descricao: 'Rachadura no muro de um prédio na Av. Afonso Pena.',
        lat: -19.9205,
        lng: -43.9337
      },
      {
        descricao: 'Rachadura na rua em frente à Praça da Liberdade.',
        lat: -19.9290,
        lng: -43.9385
      }
    ];

    denuncias.forEach(denuncia => {
      const marcador = new google.maps.Marker({
        position: { lat: denuncia.lat, lng: denuncia.lng },
        map: fullMap,
        title: denuncia.descricao
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<p>${denuncia.descricao}</p>`
      });

      marcador.addListener('click', function() {
        infoWindow.open(fullMap, marcador);
      });
    });

    // Ajustando o mapa para mostrar os marcadores no mapa completo
    const bounds = new google.maps.LatLngBounds();
    denuncias.forEach(denuncia => {
      bounds.extend(new google.maps.LatLng(denuncia.lat, denuncia.lng));
    });
    fullMap.fitBounds(bounds);  // Ajusta o mapa para mostrar todos os marcadores
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
