// script.js
console.log("Arquivo script.js carregado e executando.");

const btnAddImage = document.getElementById('btn-add-image');
const btnAddVideo = document.getElementById('btn-add-video');
const imageInput = document.getElementById('image-input');
const videoInput = document.getElementById('video-input');
const updateDescription = document.getElementById('update-description');
const btnBack = document.getElementById('btn-back');
const btnSave = document.getElementById('btn-save');

// Log para verificar se os elementos HTML foram encontrados pelo JavaScript
console.log("Elemento btn-add-image:", btnAddImage);
console.log("Elemento image-input:", imageInput);
console.log("Elemento btn-add-video:", btnAddVideo);
console.log("Elemento video-input:", videoInput);
console.log("Elemento update-description:", updateDescription);
console.log("Elemento btn-back:", btnBack);
console.log("Elemento btn-save:", btnSave);

let selectedImageName = null;
let selectedVideoName = null;

if (btnAddImage && imageInput) {
    btnAddImage.addEventListener('click', () => {
        console.log("Botão 'Adicionar Imagem' CLICADO.");
        imageInput.click(); // Aciona o clique no input de arquivo escondido
    });
} else {
    console.error("ERRO: Não foi possível encontrar 'btn-add-image' ou 'image-input'. Verifique os IDs no HTML.");
}

if (imageInput) {
    imageInput.addEventListener('change', (event) => {
        console.log("Input 'image-input' MUDOU (arquivo selecionado).");
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
} else {
     console.error("ERRO: Não foi possível encontrar 'image-input'. Verifique o ID no HTML.");
}

if (btnAddVideo && videoInput) {
    btnAddVideo.addEventListener('click', () => {
        console.log("Botão 'Adicionar Vídeo' CLICADO.");
        videoInput.click(); // Aciona o clique no input de arquivo escondido
    });
} else {
    console.error("ERRO: Não foi possível encontrar 'btn-add-video' ou 'video-input'. Verifique os IDs no HTML.");
}

if (videoInput) {
    videoInput.addEventListener('change', (event) => {
        console.log("Input 'video-input' MUDOU (arquivo selecionado).");
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
} else {
    console.error("ERRO: Não foi possível encontrar 'video-input'. Verifique o ID no HTML.");
}


if (btnSave && updateDescription) {
    btnSave.addEventListener('click', () => {
        console.log("Botão 'Salvar Atualização' CLICADO.");
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
} else {
    console.error("ERRO: Não foi possível encontrar 'btn-save' ou 'update-description'. Verifique os IDs no HTML.");
}

if (btnBack) {
    btnBack.addEventListener('click', () => {
        console.log("Botão 'Voltar' CLICADO.");
        alert("Simulando: Voltando para a tela anterior...");
        console.log("Clicou em Voltar");
        // Exemplo: window.history.back(); ou outra lógica de navegação
    });
} else {
    console.error("ERRO: Não foi possível encontrar 'btn-back'. Verifique o ID no HTML.");
}

console.log("Fim da execução inicial do script.js. Ouvintes de eventos configurados (se os elementos foram encontrados).");