let miniMap, fullMap;
let miniMarkers = [], fullMarkers = [];
let denuncias = [];
let marcadorUsuario = null;

// Função para carregar denúncias do db.json
async function carregarDenuncias() {
  try {
    console.log("Carregando denúncias...");
    
    // Caminho corrigido para vinicius_goncalves/db/db.json
    const response = await fetch('../../vinicius_goncalves/db/db.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    denuncias = data.denuncias || [];
    
    console.log(`${denuncias.length} denúncias carregadas:`, denuncias);
    
    if (denuncias.length === 0) {
      console.warn("Nenhuma denúncia encontrada no db.json");
    }
    
    renderizarMarcadores();
  } catch (err) {
    console.error("Falha ao carregar denúncias:", err);
    alert(`Erro ao carregar denúncias: ${err.message}\nVerifique o console para detalhes.`);
  }
}

// Função para renderizar marcadores no mapa
function renderizarMarcadores() {
  console.log("Renderizando marcadores...");
  
  // Limpa marcadores existentes
  miniMarkers.forEach(m => m.setMap(null));
  fullMarkers.forEach(m => m.setMap(null));
  miniMarkers = [];
  fullMarkers = [];

  const filtro = document.getElementById("filtroCategoria").value;
  console.log(`Aplicando filtro: ${filtro}`);

  denuncias.forEach((denuncia, index) => {
    // Verifica se tem coordenadas válidas
    if (!denuncia.lat || !denuncia.lng) {
      console.warn(`Denúncia ${index} sem coordenadas válidas:`, denuncia);
      return;
    }

    const visivel = filtro === "todas" || denuncia.categoria === filtro;
    const position = { 
      lat: parseFloat(denuncia.lat), 
      lng: parseFloat(denuncia.lng) 
    };

    console.log(`Processando denúncia ${index} em:`, position);

    const content = `
      <div style="max-width: 200px;">
        <p><b>Descrição:</b> ${denuncia.descricao || 'Sem descrição'}</p>
        <p><b>Categoria:</b> ${denuncia.categoria || 'Não especificada'}</p>
        <p><b>CEP:</b> ${denuncia.cep || 'Não informado'} - <b>Número:</b> ${denuncia.numero || 'N/A'}</p>
        ${denuncia.imagem ? `<img src="${denuncia.imagem}" alt="Imagem da denúncia" style="width: 100%; margin-top: 5px;">` : ''}
      </div>
    `;

    const infoWindow = new google.maps.InfoWindow({ content });

    // Marcador no mapa mini
    if (visivel) {
      const markerMini = new google.maps.Marker({
        position,
        map: miniMap,
        title: `Denúncia #${index + 1}`,
      });
      markerMini.addListener("click", () => {
        infoWindow.open(miniMap, markerMini);
      });
      miniMarkers.push(markerMini);
    }

    // Marcador no mapa full
    const markerFull = new google.maps.Marker({
      position,
      map: visivel ? fullMap : null,
      title: `Denúncia #${index + 1}`,
    });
    markerFull.addListener("click", () => {
      infoWindow.open(fullMap, markerFull);
    });
    fullMarkers.push(markerFull);
  });

  console.log(`${miniMarkers.length} marcadores renderizados no miniMap`);
  console.log(`${fullMarkers.length} marcadores renderizados no fullMap`);
}

function initMaps() {
  console.log("Inicializando mapas...");
  
  // Coordenadas padrão (ex: Centro de Belo Horizonte)
  const defaultCoords = { lat: -19.9167, lng: -43.9345 };

  // Verifica se os elementos do mapa existem
  if (!document.getElementById("miniMap") || !document.getElementById("fullMap")) {
    console.error("Elementos do mapa não encontrados!");
    return;
  }

  // Inicializa miniMap
  miniMap = new google.maps.Map(document.getElementById("miniMap"), {
    center: defaultCoords,
    zoom: 13,
    gestureHandling: "cooperative"
  });

  // Inicializa fullMap
  fullMap = new google.maps.Map(document.getElementById("fullMap"), {
    center: defaultCoords,
    zoom: 15,
    gestureHandling: "greedy"
  });

  // Configura modal do mapa
  const modal = document.getElementById("mapModal");
  const closeModal = document.querySelector(".close");

  document.getElementById("miniMap").addEventListener("click", () => {
    console.log("Abrindo mapa em tela cheia...");
    modal.style.display = "block";
    // Atualiza o centro quando abre o modal
    fullMap.setCenter(miniMap.getCenter());
  });

  closeModal.addEventListener("click", () => {
    console.log("Fechando mapa em tela cheia...");
    modal.style.display = "none";
  });

  // Configura filtro
  document.getElementById("filtroCategoria").addEventListener("change", () => {
    console.log("Filtro alterado, renderizando marcadores...");
    renderizarMarcadores();
  });

  // Carrega as denúncias
  carregarDenuncias();

  // Acompanha localização do usuário (opcional)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log("Localização do usuário:", userLocation);
      miniMap.setCenter(userLocation);
    }, (error) => {
      console.warn("Erro ao obter localização:", error.message);
    });
  }
}

// Debug: Verifica se o script foi carregado
console.log("app.js carregado com sucesso!");