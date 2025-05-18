document.addEventListener("DOMContentLoaded", async () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (!usuario || usuario.login !== "admin") {
      alert("Acesso negado!");
      window.location.href = "login.html";
      return;
  }

  document.getElementById("saudacao").textContent = `Olá ${usuario.nome}`;

  try {
      const response = await fetch("./usuarios.json"); 
      if (!response.ok) throw new Error("Erro ao carregar usuários");

      const usuarios = await response.json();

      const tbody = document.getElementById("userTableBody");
      usuarios.forEach(user => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
              <td>${user.nome}</td>
              <td>${user.email}</td>
              <td>${user.telefone}</td>
              <td>${user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</td>
              <td>${user.dataNascimento}</td>
              <td>${user.endereco.rua}</td>
              <td>${user.endereco.bairro}</td>
              <td>${user.endereco.cep}</td>
              <td>${user.endereco.numero}</td>
          `;
          tbody.appendChild(tr);
      });

  } catch (error) {
      console.error("Erro ao carregar usuários:", error);
  }
});

function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "login.html";
}




