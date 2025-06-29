document.addEventListener('DOMContentLoaded', () => {

    const API_URL = "https://rachadura.onrender.com/api/usuarios";
    let db_usuarios = [];

    // --- INICIALIZAÇÃO DAS MÁSCARAS (IMask.js) ---
    const cpfInput = document.getElementById('reg-cpf');
    const cepInput = document.getElementById('reg-cep');

    const cpfMask = IMask(cpfInput, { mask: '000.000.000-00' });
    const cepMask = IMask(cepInput, { mask: '00.000-000' });

    // --- LÓGICA DE ENDEREÇO COM VUE.JS ---
    const appEndereco = Vue.createApp({
        data() {
            return {
                cep: '', logradouro: '', numero: '', complemento: '',
                bairro: '', cidade: '', estado: ''
            }
        },
        methods: {
            async buscarCep() {
                // Pega o valor sem máscara para fazer a busca na API
                const cepLimpo = this.cep.replace(/\D/g, '');
                if (cepLimpo.length === 8) {
                    try {
                        const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
                        if (!response.data.erro) {
                            this.logradouro = response.data.logradouro;
                            this.bairro = response.data.bairro;
                            this.cidade = response.data.localidade;
                            this.estado = response.data.uf;
                        } else {
                            alert("CEP não encontrado.");
                        }
                    } catch (error) {
                        console.error("Erro ao buscar CEP:", error);
                    }
                }
            },
            getEnderecoCompleto() {
                return {
                    cep: this.cep, logradouro: this.logradouro, numero: this.numero, complemento: this.complemento,
                    bairro: this.bairro, cidade: this.cidade, estado: this.estado
                };
            }
        }
    }).mount('#vue-endereco-app');

    // --- FUNÇÕES AUXILIARES ---
    const fileToBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const generateUserId = () => "user_" + Math.floor(Math.random() * 90000 + 10000);

    const isMaiorDeIdade = (dataNascimento) => {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const m = hoje.getMonth() - nascimento.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() <= nascimento.getDate())) {
            idade--;
        }
        return idade >= 18;
    };

    // --- LÓGICA PRINCIPAL ---
    async function carregarUsuarios() {
        try {
            const response = await axios.get(API_URL);
            db_usuarios = response.data;
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
        }
    }
    
    function loginUser(login, senha) {
        const user = db_usuarios.find(u => u.usuario === login && u.senha === senha);
        if (user) {
            sessionStorage.setItem('usuarioCorrente', JSON.stringify(user));
            localStorage.setItem('usuarioId', user.id);
            return true;
        }
        return false;
    }

    async function addUser(novoUsuario) {
        try {
            const response = await axios.post(API_URL, novoUsuario);
            db_usuarios.push(response.data);
            alert("Usuário criado com sucesso!");
            return true;
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            alert("Erro ao criar usuário. O nome de usuário ou CPF pode já estar em uso.");
            return false;
        }
    }

    // --- EVENT LISTENERS ---
    const formLogin = document.getElementById('login-form');
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        if (loginUser(document.getElementById('username').value, document.getElementById('password').value)) {
            window.location.href = 'home_page.html';
        } else {
            alert('Usuário ou senha incorretos.');
        }
    });

    const btnSalvar = document.getElementById('btn-salvar-usuario');
    btnSalvar.addEventListener('click', async () => {
        const cpf = cpfMask.unmaskedValue; // Pega o valor sem máscara
        const dataNascimento = document.getElementById('reg-nascimento').value;

        if (!isMaiorDeIdade(dataNascimento)) {
            alert("É necessário ser maior de 18 anos para se cadastrar.");
            return;
        }
        // ... outras validações ...
        const senha = document.getElementById('reg-senha').value;
        const senha2 = document.getElementById('reg-senha2').value;
        if (senha !== senha2) {
            alert("As senhas não conferem.");
            return;
        }

        let fotoBase64 = "https://i.pravatar.cc/150"; // Imagem padrão
        const fotoFile = document.getElementById('reg-foto').files[0];
        if (fotoFile) {
            fotoBase64 = await fileToBase64(fotoFile);
        }

        const novoUsuario = {
            id: generateUserId(),
            nome: document.getElementById('reg-nome').value.trim(),
            usuario: document.getElementById('reg-usuario').value.trim(),
            senha: senha,
            email: document.getElementById('reg-email').value.trim(),
            cpf: cpf,
            data_nascimento: dataNascimento,
            foto_perfil: fotoBase64,
            endereco_residencial: appEndereco.getEnderecoCompleto(),
            data_criacao: new Date().toISOString(),
            nivel: "usuario",
            status: "ativo"
        };
        
        if (await addUser(novoUsuario)) {
            const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
            registerModal.hide();
            document.getElementById('register-form').reset();
            appEndereco.cep = ''; // Limpa o CEP no Vue
        }
    });

    carregarUsuarios();
});