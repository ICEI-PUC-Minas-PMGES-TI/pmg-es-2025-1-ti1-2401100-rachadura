document.addEventListener('DOMContentLoaded', async () => {
    if (!verificarLoginERedirecionar("Você precisa estar logado para ver seu perfil.")) {
        return; 
    }

    const usuarioId = localStorage.getItem('usuarioId');
    const API_URL = "https://rachadura.onrender.com/api";

    
    const perfilFoto = document.getElementById('perfil-foto');
    const perfilNome = document.getElementById('perfil-nome');
    const perfilUsuario = document.getElementById('perfil-usuario');
    const perfilEmail = document.getElementById('perfil-email');
    const denunciasContainer = document.getElementById('minhas-denuncias-container');
    const btnLogout = document.getElementById('btn-logout');

 

    function renderizarPerfil(usuario) {
        if (!usuario) return;
        perfilFoto.src = usuario.foto_perfil || 'https://placehold.co/100x100?text=U';
        perfilNome.textContent = usuario.nome || 'Nome não encontrado';
        perfilUsuario.textContent = `@${usuario.usuario || 'username'}`;
        perfilEmail.textContent = usuario.email || 'email@exemplo.com';
    }

    function renderizarMinhasDenuncias(denuncias) {
        denunciasContainer.innerHTML = ''; // Limpa a mensagem "Carregando..."

        if (denuncias.length === 0) {
            denunciasContainer.innerHTML = '<p>Você ainda não postou nenhuma denúncia.</p>';
            return;
        }

        denuncias.forEach(denuncia => {
            const dataFormatada = new Date(denuncia.dataRegistro).toLocaleDateString('pt-BR');
            const card = document.createElement('a');
            card.className = 'denuncia-link-card';
            // Link para a página de detalhes/comentários
            card.href = `/views/comentarios.html?id=${denuncia.id}`;
            
            card.innerHTML = `
                <h4>${denuncia.titulo}</h4>
                <p style="margin: 0; color: #555;">Categoria: ${denuncia.categoria}</p>
                <small style="color: #777;">Registrada em: ${dataFormatada}</small>
            `;
            denunciasContainer.appendChild(card);
        });
    }

   

    async function carregarDadosDoPerfil() {
        try {
          
            const [usuarioRes, denunciasRes] = await Promise.all([
                axios.get(`${API_URL}/usuarios/${usuarioId}`),
                axios.get(`${API_URL}/denuncias`)
            ]);
            
            const usuario = usuarioRes.data;
            const todasAsDenuncias = denunciasRes.data;

           
            const minhasDenuncias = todasAsDenuncias.filter(d => d.usuarioId === usuarioId);
            
            
            minhasDenuncias.sort((a, b) => new Date(b.dataRegistro) - new Date(a.dataRegistro));
            
     
            renderizarPerfil(usuario);
            renderizarMinhasDenuncias(minhasDenuncias);

        } catch (error) {
            console.error("Erro ao carregar dados do perfil:", error);
            document.querySelector('.cartao').innerHTML = '<h2>Ocorreu um erro ao carregar seu perfil. Tente novamente mais tarde.</h2>';
        }
    }

 
    btnLogout.addEventListener('click', () => {
        if(confirm("Deseja realmente sair?")) {
            // Limpa os dados de login do navegador
            localStorage.removeItem('usuarioId');
            sessionStorage.removeItem('usuarioCorrente');
            // Redireciona para a página de login
            window.location.href = '/views/login.html';
        }
    });


   
    carregarDadosDoPerfil();

});