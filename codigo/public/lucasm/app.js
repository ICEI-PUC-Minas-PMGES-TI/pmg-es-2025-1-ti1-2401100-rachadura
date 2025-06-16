const cpfInput = document.getElementById('cpf');
const telefoneInput = document.getElementById('telefone');
const cepInput = document.getElementById('cep');

IMask(cpfInput, { mask: '000.000.000-00' });
IMask(telefoneInput, { mask: '(00) 00000-0000' });
IMask(cepInput, { mask: '00000-000' });

document.getElementById('cadastro-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const dados = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    telefone: telefoneInput.value,
    cpf: cpfInput.value,
    nascimento: document.getElementById('data-nascimento').value,
    rua: document.getElementById('rua').value,
    bairro: document.getElementById('bairro').value,
    cep: cepInput.value,
    numero: document.getElementById('numero').value,
    complemento: document.getElementById('complemento').value
  };

  fetch('http://localhost:3000/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })
    .then(res => {
      if (res.ok) {
        alert('Usuário cadastrado com sucesso!');
        document.getElementById('cadastro-form').reset();
      } else {
        alert('Erro ao cadastrar usuário.');
      }
    });
});
