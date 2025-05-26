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
      enderecoBloqueado: false
    };
  },
  methods: {
    cepAlteradoEvento() {
      if (!this.endereco.cep) return;
      const cepLimpo = this.endereco.cep.replace(/\D/g, "");
      if (cepLimpo.length !== 8) {
        alert("O CEP deve conter exatamente 8 números.");
        return;
      }
      axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`)
        .then(response => {
          const bean = response.data;
          if (bean.erro) {
            alert("CEP não encontrado.");
            return;
          }
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
          alert("Erro ao buscar CEP.");
        });
    },
    mostrarPreview(event) {
      const previewDiv = document.getElementById("previewContainer");
      previewDiv.innerHTML = "";

      const arquivos = event.target.files;
      for (const file of arquivos) {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = function(e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.className = "preview";
            previewDiv.appendChild(img);
          };
          reader.readAsDataURL(file);
        }
      }
    },
    enviarFormulario(event) {
      event.preventDefault();

      const formData = new FormData();
      const midiaInput = document.getElementById("midia");
      for (const file of midiaInput.files) {
        formData.append("midia", file);
      }

      formData.append("titulo", document.getElementById("titulo").value);
      formData.append("categoria", document.getElementById("categoria").value);
      formData.append("numero", document.getElementById("numero").value);
      formData.append("descricao", document.getElementById("descricao").value);
      formData.append("endereco", JSON.stringify(this.endereco));

      axios.post("http://localhost:3000/upload", formData)
        .then(res => {
          alert("Denúncia enviada com sucesso!");
          console.log(res.data);
        })
        .catch(err => {
          alert("Erro ao enviar a denúncia.");
          console.error(err);
        });
    }
  },
  mounted() {
    const form = document.getElementById("formDenuncia");
    if (form) {
      form.addEventListener("submit", this.enviarFormulario);
    }

    const midiaInput = document.getElementById("midia");
    if (midiaInput) {
      midiaInput.addEventListener("change", this.mostrarPreview);
    }

    const cepInput = document.querySelector('input[v-model="endereco.cep"]');
    if (cepInput) {
      cepInput.addEventListener("input", function(e) {
        let valor = e.target.value.replace(/\D/g, "");
        valor = valor.slice(0, 8);
        if (valor.length > 5) {
          valor = valor.slice(0, 5) + "-" + valor.slice(5);
        }
        e.target.value = valor;
      });
    }

    const numeroInput = document.getElementById("numero");
    if (numeroInput) {
      numeroInput.addEventListener("input", function(e) {
        let valor = e.target.value.replace(/\D/g, "");
        e.target.value = valor;
      });
    }
  }
}).mount("#appCep");
