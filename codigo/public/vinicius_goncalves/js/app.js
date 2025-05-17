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
      camposExtras: {
        siafi: "siafi",
        ibge: "ibge",
        ddd: "ddd",
        gia: "gia"
      }
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
        });
    },
    enviarFormulario(event) {
      event.preventDefault();

      const titulo = document.getElementById("titulo").value;
      const categoria = document.getElementById("categoria").value;
      const descricao = document.getElementById("descricao").value;
      const midias = Array.from(document.getElementById("midia").files).map(f => f.name);

      const dados = {
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
        })
        .catch(error => {
          alert("Erro ao enviar denúncia");
          console.error(error);
        });
    }
  },
  mounted() {
    const form = document.getElementById("formDenuncia");
    form.addEventListener("submit", this.enviarFormulario);
  }
}).mount("#appCep");
