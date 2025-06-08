# Projeto Radar Urbano – VINICIUS_GONCALVES

Este é um sistema de registro de denúncias urbanas, com funcionalidades como preenchimento automático de endereço via CEP, upload de mídias e visualização das últimas denúncias feitas por um usuário.

---

## ✅ Requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (recomendado: versão LTS)
- [Visual Studio Code](https://code.visualstudio.com/)
- Extensão **Live Server** no VSCode

---

## 📦 Como usar o projeto

### 1. Faça o download, extraia e abra via VSCode  `vinicius_goncalves.rar`

### 2. Instale as dependências

Abra o terminal no VSCode e execute:

```
npm install
```

### 3. Inicie o servidor JSON e o site

Execute o comando:

```
npm start
```

Isso iniciará o servidor na porta `3000`, usando o arquivo `db/db.json` como banco de dados simulado, e servindo os arquivos HTML/CSS/JS da raiz.


### 4. Abra o site com Live Server

No VSCode, clique com o botão direito no arquivo `index.html` e escolha:

```
Open with Live Server
```

O navegador abrirá algo como `http://127.0.0.1:5500/index.html`.

> O frontend e o backend se comunicam via API Fetch, então ambos devem estar ativos.

---

## ✨ Funcionalidades principais

- 📝 Preenchimento de formulário de denúncia
- 🔍 Busca automática de endereço pelo CEP (`viacep.com.br`)
- 🖼️ Simulação de upload de imagens e vídeos
- 💾 Salvamento no `db.json` com `json-server`
- 👤 Identificação automática de usuário com `localStorage`
- 📋 Exibição das 5 últimas denúncias feitas por esse usuário
- ❌ Botão "Cancelar" limpa o formulário instantaneamente
- 🧼 Tabela oculta quando não há denúncias
- 📱 Estilo responsivo e moderno

---

## 📌 Observações

- Ao abrir o site, um `usuarioId` é gerado automaticamente no `localStorage` do navegador.
- Os dados são persistidos enquanto o `json-server` estiver rodando.
- A pasta `db/` contém os dados armazenados.

---

## 🛠 Scripts disponíveis

No arquivo `package.json`, existe o seguinte script configurado:

```
npm start
```

Ele executa:

```
json-server --watch db/db.json --port 3000 --static ./
```

---

## 👨‍💻 Autor

Vinicius Gonçalves