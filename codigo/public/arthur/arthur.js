const btnAddImage = document.getElementById('btn-add-image');
const btnAddVideo = document.getElementById('btn-add-video');
const imageInput = document.getElementById('image-input');
const videoInput = document.getElementById('video-input');
const updateDescription = document.getElementById('update-description');
const btnBack = document.getElementById('btn-back');
const btnSave = document.getElementById('btn-save');

let selectedImageName = null;
let selectedVideoName = null;

btnAddImage.addEventListener('click', () => {
    imageInput.click();
});

imageInput.addEventListener('change', (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        selectedImageName = files[0].name;
        console.log(`Imagem selecionada: ${selectedImageName}`);
        alert(`Imagem selecionada: ${selectedImageName}`);
        imageInput.value = '';
    } else {
        selectedImageName = null;
        console.log("Seleção de imagem cancelada.");
    }
});

btnAddVideo.addEventListener('click', () => {
    videoInput.click();
});

videoInput.addEventListener('change', (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        selectedVideoName = files[0].name;
        console.log(`Vídeo selecionado: ${selectedVideoName}`);
        alert(`Vídeo selecionado: ${selectedVideoName}`);
        videoInput.value = '';
    } else {
        selectedVideoName = null;
        console.log("Seleção de vídeo cancelada.");
    }
});

btnSave.addEventListener('click', () => {
    const descriptionText = updateDescription.value.trim();
    const updateData = {
        descricao: descriptionText,
        imagem: selectedImageName,
        video: selectedVideoName
    };

    console.log("Dados a serem 'salvos':", updateData);

    if (!descriptionText && !selectedImageName && !selectedVideoName) {
        alert("Nada para salvar. Adicione uma descrição, imagem ou vídeo.");
        return;
    }

    alert("Simulação: Atualização salva com sucesso!");
    console.log("--- Atualização 'enviada' para o servidor (simulação) ---");

    updateDescription.value = '';
    selectedImageName = null;
    selectedVideoName = null;
});

btnBack.addEventListener('click', () => {
    alert("Simulando: Voltando para a tela anterior...");
    console.log("Clicou em Voltar");
});

console.log("Interface de atualização carregada.");