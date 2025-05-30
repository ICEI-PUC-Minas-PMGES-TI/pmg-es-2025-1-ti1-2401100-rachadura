let miniMap, fullMap;
let miniMarkers = [], fullMarkers = [];
let denuncias = JSON.parse(localStorage.getItem('denuncias')) || [];

let marcadorUsuario = null;

function salvarDenunciasNoStorage() {
  localStorage.setItem('denuncias', JSON.stringify(denuncias));
}

function limparFormulario() {
  document.getElementById("inputDescricao").value = "";
  document.getElementById("inputCategoria").value = "carro_quebrado";
  document.getElementById("inputCEP").value = "";
  document.getElementById("inputNumero").value = "";
  document.getElementById("inputImagem").value = "";
}

function renderizarMarcadores() {
  miniMarkers.forEach(m => m.setMap(null));
  fullMarkers.forEach(m => m.setMap(null));
  miniMarkers = [];
  fullMarkers = [];

  const filtro = document.getElementById("filtroCategoria").value;

  denuncias.forEach((denuncia) => {
    const visivel = filtro === "todas" || denuncia.categoria === filtro;

    const content = `
      <div style="max-width: 200px;">
        <p><b>Descrição:</b> ${denuncia.descricao}</p>
        <p><b>CEP:</b> ${denuncia.cep} - <b>Número:</b> ${denuncia.numero}</p>
        <img src="${denuncia.imagem}" alt="Imagem da denúncia" style="width: 100%; margin-top: 5px;">
      </div>
    `;

    const infoWindow = new google.maps.InfoWindow({ content });

    const markerMini = new google.maps.Marker({
      position: { lat: denuncia.lat, lng: denuncia.lng },
      map: visivel ? miniMap : null,
    });
    markerMini.categoria = denuncia.categoria;
    markerMini.addListener("click", () => infoWindow.open(miniMap, markerMini));
    miniMarkers.push(markerMini);

    const markerFull = new google.maps.Marker({
      position: { lat: denuncia.lat, lng: denuncia.lng },
      map: visivel ? fullMap : null,
    });
    markerFull.categoria = denuncia.categoria;
    markerFull.addListener("click", () => infoWindow.open(fullMap, markerFull));
    fullMarkers.push(markerFull);
  });
}

function adicionarDenuncia(descricao, categoria, imagemBase64, latLng, cep, numero) {
  const nova = {
    descricao,
    categoria,
    imagem: imagemBase64 || "../imgs/default.jpg",
    lat: latLng.lat,
    lng: latLng.lng,
    cep,
    numero
  };
  denuncias.push(nova);
  salvarDenunciasNoStorage();
  renderizarMarcadores();
}

async function buscarEnderecoViaCEP(cep) {
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erro na requisição ViaCEP");
    const data = await response.json();
    if (data.erro) throw new Error("CEP não encontrado");
    return data;
  } catch (err) {
    alert("Erro ao buscar endereço pelo CEP: " + err.message);
    return null;
  }
}

function geocodeEndereco(geocoder, endereco) {
  return new Promise((resolve, reject) => {
    geocoder.geocode({ address: endereco }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        resolve({ lat: location.lat(), lng: location.lng() });
      } else {
        reject("Não foi possível encontrar localização para o endereço");
      }
    });
  });
}

function acompanharLocalizacaoUsuario() {
  if (!navigator.geolocation) {
    alert("Geolocalização não suportada pelo seu navegador.");
    return;
  }

  navigator.geolocation.watchPosition((pos) => {
    const coords = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    };

    // Atualizar marcador da posição do usuário
    if (!marcadorUsuario) {
      marcadorUsuario = new google.maps.Marker({
        position: coords,
        map: miniMap,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#4285F4",
          fillOpacity: 1,
          strokeColor: "#fff",
          strokeWeight: 2,
        },
        title: "Sua localização",
      });
      miniMap.setCenter(coords);
    } else {
      marcadorUsuario.setPosition(coords);
    }

  }, (error) => {
    console.warn("Erro ao obter localização:", error.message);
  }, {
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  });
}

function initMaps() {
  const defaultCoords = { lat: -19.9288, lng: -43.9378 };

  miniMap = new google.maps.Map(document.getElementById("miniMap"), {
    center: defaultCoords,
    zoom: 15,
  });

  fullMap = new google.maps.Map(document.getElementById("fullMap"), {
    center: defaultCoords,
    zoom: 15,
  });

  const modal = document.getElementById("mapModal");
  const closeModal = document.querySelector(".close");

  document.getElementById("miniMap").addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  document.getElementById("filtroCategoria").addEventListener("change", renderizarMarcadores);

  document.getElementById("botaoSalvar").addEventListener("click", async () => {
    const desc = document.getElementById("inputDescricao").value.trim();
    const cat = document.getElementById("inputCategoria").value;
    const cep = document.getElementById("inputCEP").value.trim();
    const numero = document.getElementById("inputNumero").value.trim();
    const file = document.getElementById("inputImagem").files[0];

    if (!desc || !cat || !cep || !numero) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const geocoder = new google.maps.Geocoder();

    // 1. Buscar endereço via CEP
    const enderecoViaCEP = await buscarEnderecoViaCEP(cep.replace(/\D/g, ''));
    if (!enderecoViaCEP) return;

    // 2. Montar endereço completo para geocoding
    const enderecoCompleto = `${enderecoViaCEP.logradouro}, ${numero}, ${enderecoViaCEP.localidade} - ${enderecoViaCEP.uf}, Brasil`;

    try {
      // 3. Obter lat/lng via geocoding
      const latLng = await geocodeEndereco(geocoder, enderecoCompleto);

      // 4. Agora salvar denúncia com latLng correto
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          adicionarDenuncia(desc, cat, reader.result, latLng, cep, numero);
          limparFormulario();
          alert("Denúncia adicionada com sucesso!");
        };
        reader.readAsDataURL(file);
      } else {
        adicionarDenuncia(desc, cat, null, latLng, cep, numero);
        limparFormulario();
        alert("Denúncia adicionada com sucesso!");
      }
    } catch (err) {
      alert(err);
    }
  });

  // Primeiro render dos marcadores armazenados
  renderizarMarcadores();

  // Pedir permissão e acompanhar localização em tempo real
  acompanharLocalizacaoUsuario();
}
