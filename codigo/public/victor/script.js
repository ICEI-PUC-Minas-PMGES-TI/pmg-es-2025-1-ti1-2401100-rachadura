document.getElementById("filtrarBtn").addEventListener("click", () => {
  const categoriaSelecionada = document.getElementById("categoria-denuncia").value;
  const dataInicial = document.getElementById("data-inicial").value;
  const resultadoDiv = document.getElementById("resultadoDenuncias");

  if (!categoriaSelecionada) {
    resultadoDiv.innerHTML = "<p>Por favor, selecione uma categoria.</p>";
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
      const resultados = denuncias.filter(d => {
        const mesmaCategoria = d.categoria === categoriaSelecionada;
        const dataValida = !dataInicial || d.data >= dataInicial;
        return mesmaCategoria && dataValida;
      });

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
