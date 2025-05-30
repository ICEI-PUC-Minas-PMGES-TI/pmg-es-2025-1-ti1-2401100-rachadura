document.getElementById("filtrarBtn").addEventListener("click", () => {
  const categoriaSelecionada = document.getElementById("categoria-denuncia").value;
  const dataInicial = document.getElementById("data-inicial").value;
  const resultadoDiv = document.getElementById("resultadoDenuncias");

  if (!categoriaSelecionada || !dataInicial) {
    resultadoDiv.innerHTML = "<p>Por favor, selecione uma categoria e uma data.</p>";
    return;
  }

  fetch('denuncias.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo JSON.');
      }
      return response.json();
    })
    .then(denuncias => {
      const resultados = denuncias.filter(d =>
        d.categoria === categoriaSelecionada && d.data >= dataInicial
      );

      if (resultados.length === 0) {
        resultadoDiv.innerHTML = "<p>Nenhuma denúncia encontrada.</p>";
      } else {
        resultadoDiv.innerHTML = resultados.map(d => `
          <div class="denuncia">
            <p><strong>Categoria:</strong> ${d.categoria}</p>
            <p><strong>Data:</strong> ${d.data}</p>
            <p><strong>Descrição:</strong> ${d.descricao}</p>
           <p><strong>Status:</strong> <span class="status ${d.status}">${d.status}</span></p>
            <hr>
          </div>
        `).join("");
      }
    })
    .catch(erro => {
      console.error(erro);
      resultadoDiv.innerHTML = "<p>Erro ao carregar as denúncias.</p>";
    });
});
