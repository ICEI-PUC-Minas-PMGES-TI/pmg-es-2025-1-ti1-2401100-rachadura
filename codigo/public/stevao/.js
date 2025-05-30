const usuariosFicticios = [
    {
        nome: "Carlos Oliveira",
        email: "carlos.oliveira@email.com",
        telefone: "11987654321",
        cpf: "12345678901",
        dataNascimento: "1985-08-12",
        endereco: {
            rua: "Rua das Orquídeas",
            bairro: "Centro",
            cep: "01010-000",
            numero: "456"
        }
    },
    {
        nome: "Mariana Santos",
        email: "mariana.santos@email.com",
        telefone: "21965432178",
        cpf: "98765432100",
        dataNascimento: "1993-03-25",
        endereco: {
            rua: "Avenida Brasil",
            bairro: "Jardins",
            cep: "22040-010",
            numero: "789"
        }
    },
    {
        nome: "Pedro Ferreira",
        email: "pedro.ferreira@email.com",
        telefone: "31976543210",
        cpf: "56789012345",
        dataNascimento: "1979-11-30",
        endereco: {
            rua: "Travessa Azul",
            bairro: "São João",
            cep: "33030-020",
            numero: "101"
        }
    }
];

// Salvar usuários fictícios no localStorage
localStorage.setItem("usuariosCadastrados", JSON.stringify(usuariosFicticios));

console.log("Usuários fictícios cadastrados com sucesso!");
