document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const userData = {
        nome: document.getElementById("name").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("phone").value,
        cpf: document.getElementById("cpf").value,
        dataNascimento: document.getElementById("birthdate").value,
        endereco: {
            rua: document.getElementById("street").value,
            bairro: document.getElementById("neighborhood").value,
            cep: document.getElementById("cep").value,
            numero: document.getElementById("number").value
        },
        senha: document.getElementById("password").value
    };

    document.getElementById("result").textContent = JSON.stringify(userData, null, 4);
});

// Função para alternar a exibição dos campos de endereço
document.getElementById("toggleAddress").addEventListener("click", function() {
    const addressFields = document.getElementById("addressFields");
    addressFields.classList.toggle("hidden");

    // Alterar texto do botão conforme expandir ou recolher
    this.textContent = addressFields.classList.contains("hidden") ? "Endereço ⮟" : "Endereço ⮝";
});

