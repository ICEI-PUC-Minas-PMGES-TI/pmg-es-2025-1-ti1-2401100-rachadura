let miniMap, fullMap;

function initMaps() {
  const centerCoords = { lat: -23.5881, lng: -46.6564 }; // Ponto central

  miniMap = new google.maps.Map(document.getElementById("miniMap"), {
    center: centerCoords,
    zoom: 14,
    disableDefaultUI: true
  });

  fullMap = new google.maps.Map(document.getElementById("fullMap"), {
    center: centerCoords,
    zoom: 15
  });
}

// Modal toggle
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById('mapModal');
  const closeBtn = document.querySelector('.close');

  document.getElementById('miniMap').addEventListener('click', () => {
    modal.style.display = 'block';
    google.maps.event.trigger(fullMap, "resize");
    fullMap.setCenter(miniMap.getCenter());
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
