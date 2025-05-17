function validarLogin() {
  const login = document.getElementById("login").value;
  const senha = document.getElementById("senha").value;

  const adminLogin = "admin";
  const adminSenha = "1234"; 

  if (login === adminLogin && senha === adminSenha) {
      localStorage.setItem("usuarioLogado", JSON.stringify({ nome: "Administrador", login: login }));
      window.location.href = "visualizar.html";
      return false;
  } else {
      alert("Login ou senha incorretos!");
      return false;
  }
}







  
