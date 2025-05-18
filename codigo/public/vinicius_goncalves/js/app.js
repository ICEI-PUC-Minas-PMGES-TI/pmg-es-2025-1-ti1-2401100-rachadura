const { createApp } = Vue;

createApp({
  data() {
    return {
      endereco: {
        cep: "",
        logradouro: "",
        estado: "",
        cidade: "",
        bairro: "",
        siafi: "",
        ibge: "",
        ddd: "",
        gia: ""
      },
      enderecoBloqueado: false,
    };
  },

  methods: {
    cepAlteradoEvento() {
      if (!this.endereco.cep) return;
      axios.get(`https://viacep.com.br/ws/${this.endereco.cep}/json/`)
        .then(response => {
          const bean = response.data;
          this.endereco.logradouro = bean.logradouro;
          this.endereco.bairro = bean.bairro;
          this.endereco.estado = bean.uf;
          this.endereco.cidade = bean.localidade;
          this.endereco.siafi = bean.siafi;
          this.endereco.ddd = bean.ddd;
          this.endereco.ibge = bean.ibge;
          this.endereco.gia = bean.gia;
          this.enderecoBloqueado = true;
        })
        .catch(() => {
          alert("Erro ao buscar o CEP. Verifique se está correto.");
        });
    },

    enviarFormulario(event) {
      event.preventDefault();

      const usuarioId = localStorage.getItem("usuarioId") || "anonimo";
      const titulo = document.getElementById("denuncia-titulo-input").value;
      const categoria = document.querySelector("select[name='categoria']").value;
      const descricao = document.getElementById("update-description").value;
      const midias = Array.from(document.getElementById("midia").files).map(f => f.name);

      const dados = {
        usuarioId,
        titulo,
        categoria,
        descricao,
        midias,
        endereco: this.endereco,
        dataRegistro: new Date().toISOString()
      };

      axios.post("http://localhost:3000/denuncias", dados)
        .then(response => {
          alert("Denúncia enviada com sucesso!");
          console.log(response.data);
          this.mostrarTabela();
        })
        .catch(error => {
          alert("Erro ao enviar denúncia");
          console.error(error);
        });
    },

    mostrarTabela() {
      const usuarioId = localStorage.getItem("usuarioId");

      if (!usuarioId) {
        document.getElementById("tabela-denuncias").innerHTML =
          "<p class='aviso'>Usuário não identificado.</p>";
        return;
      }

      axios.get("http://localhost:3000/denuncias")
        .then(res => {
          const denuncias = res.data
            .filter(d => d.usuarioId === usuarioId)
            .sort((a, b) => new Date(b.dataRegistro) - new Date(a.dataRegistro))
            .slice(0, 5);

          if (denuncias.length === 0) {
            document.getElementById("tabela-denuncias").innerHTML ="";
            return;
          }

          let html = `
            <div class="tabela-container">
              <h2 class="titulo-tabela" >Denúncias Enviadas</h2>
              <table class="tabela-denuncias">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Categoria</th>
                    <th>Descrição</th>
                    <th>Local</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
          `;

          denuncias.forEach(d => {
            const end = d.endereco || {};
            html += `
              <tr>
                <td>${d.titulo || "-"}</td>
                <td>${d.categoria || "-"}</td>
                <td>${d.descricao || "-"}</td>
                <td>${end.logradouro || "-"}, ${end.bairro || "-"}, ${end.cidade || "-"}</td>
                <td>${d.dataRegistro ? new Date(d.dataRegistro).toLocaleString() : "-"}</td>
              </tr>
            `;
          });

          html += `
                </tbody>
              </table>
            </div>
          `;

          document.getElementById("tabela-denuncias").innerHTML = html;
        })
        .catch(err => {
          console.error("Erro ao carregar tabela:", err);
        });
    }
  },

  mounted() {
    const form = document.getElementById("formDenuncia");
    const botaoCancelar = document.getElementById("btn-back");

    if (form) {
      form.addEventListener("submit", this.enviarFormulario);
    }

    if (botaoCancelar) {
      botaoCancelar.addEventListener("click", (event) => {
        event.preventDefault(); // Impede qualquer recarregamento
        form.reset(); // Limpa os inputs do formulário

        // Se quiser limpar também os campos Vue (endereço), faça:
        this.endereco = {
          cep: "",
          logradouro: "",
          estado: "",
          cidade: "",
          bairro: "",
          siafi: "",
          ibge: "",
          ddd: "",
          gia: ""
        };

        this.enderecoBloqueado = false;
      });
    }

    this.mostrarTabela();
  }

}).mount("#appCep");

if (!localStorage.getItem("usuarioId")) {
  const randomId = "user_" + Math.floor(Math.random() * 100000);
  localStorage.setItem("usuarioId", randomId);
}
