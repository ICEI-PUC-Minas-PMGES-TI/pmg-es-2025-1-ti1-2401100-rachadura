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
        })
        .catch(error => {
          console.error("Erro ao buscar CEP:", error);
        });
    }
  }
}).mount("#appCep");
