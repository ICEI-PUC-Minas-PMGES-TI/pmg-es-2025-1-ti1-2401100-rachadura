let miniMap, fullMap;
let miniMarkers = [], fullMarkers = [];
let denuncias = [];
let marcadorUsuario = null;

// Função para carregar denúncias
async function carregarDenuncias() {
  try {
    console.log("Carregando denúncias...");

    const response = await fetch('https://rachadura.onrender.com/api/denuncias');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    denuncias = data || [];

    console.log(`${denuncias.length} denúncias carregadas:`, denuncias);

    if (denuncias.length === 0) {
      console.warn("Nenhuma denúncia foi carregada da API.");
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

  denuncias.forEach((denuncia) => {

    const endereco = denuncia.endereco || {};

    // A verificação agora busca as coordenadas DENTRO do objeto de endereço.
    if (!endereco.lat || !endereco.lng) {
      console.warn(`Denúncia ${denuncia.id} sem coordenadas válidas:`, denuncia);
      return;
    }

    const visivel = filtro === "todas" || filtro === "" || denuncia.categoria === filtro;

    // A posição do marcador agora usa as coordenadas do objeto 'endereco'.
    const position = {
      lat: parseFloat(endereco.lat),
      lng: parseFloat(endereco.lng)
    };

    console.log(`Processando denúncia ${denuncia.id} em:`, position);

    const imagemUrl = denuncia.midias && denuncia.midias.length > 0 ? denuncia.midias[0] : null;

    const content = `
      <div style="max-width: 200px;">
        <p><b>Descrição:</b> ${denuncia.descricao || 'Sem descrição'}</p>
        <p><b>Categoria:</b> ${denuncia.categoria || 'Não especificada'}</p>
        <p><b>CEP:</b> ${endereco.cep || 'Não informado'} - <b>Bairro:</b> ${endereco.bairro || 'N/A'}</p>
        ${imagemUrl ? `<img src="${imagemUrl}" alt="Imagem da denúncia" style="width: 100%; margin-top: 5px;">` : ''}
      </div>
    `;

    const infoWindow = new google.maps.InfoWindow({ content });

    const markerTitle = denuncia.titulo || `Denúncia #${denuncia.id}`;

    // Marcador no mapa mini
    if (visivel) {
      const markerMini = new google.maps.Marker({
        position,
        map: miniMap,
        title: markerTitle,
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
      title: markerTitle,
    });
    markerFull.addListener("click", () => {
      infoWindow.open(fullMap, markerFull);
    });
    fullMarkers.push(markerFull);
  });

  console.log(`${miniMarkers.length} marcadores renderizados no miniMap`);
  console.log(`${fullMarkers.length} marcadores renderizados no fullMap`);
}

window.initMaps = function () {
  console.log("Inicializando mapas...");

  // Coordenadas padrão (Centro de Belo Horizonte)
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
console.log("home_page.js carregado com sucesso!");