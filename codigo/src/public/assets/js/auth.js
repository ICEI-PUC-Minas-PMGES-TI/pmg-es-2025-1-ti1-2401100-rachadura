function verificarLoginERedirecionar(mensagemDeAlerta) {
    // Busca o ID do usuário no armazenamento local.
    const usuarioId = localStorage.getItem('usuarioId');

    // Se não encontrar um ID, o usuário não está logado.
    if (!usuarioId) {
        alert(mensagemDeAlerta);
        // O caminho pode precisar de ajuste dependendo de qual página está chamando.
        window.location.href = '/views/login.html'; 
        return false; // Retorna 'false' para indicar que o usuário não está logado.
    }
    
    // Se encontrou um ID, o usuário está logado.
    return true; // Retorna 'true'
}