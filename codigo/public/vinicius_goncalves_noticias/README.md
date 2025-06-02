# 🚀 Radar Urbano – Guia de Instalação e Execução

Este projeto exibe notícias relacionadas a problemas urbanos (buracos, esgoto, iluminação etc.), utilizando dados reais obtidos da internet por meio da **NewsAPI**.

---

## ✅ Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org) (recomendado: v18 ou superior)
- Editor de código (ex: VS Code)
- Conexão com a internet
- Navegador moderno

---

## 📦 Etapas para rodar o projeto

### 1. Clone ou extraia o projeto

```bash
git clone <repositório>
```

Ou baixe o `.zip` e extraia.

---

### 2. Instale as dependências

No terminal, dentro da pasta do projeto:

```bash
npm install
```

Isso instalará o `json-server` e o `node-fetch`.

---

### 3. Gere o banco de dados de notícias

Execute no terminal:

```bash
node noticias_fetcher.js
```

Isso criará ou atualizará o arquivo `db/db.json` com as notícias reais.

---

### 4. Inicie o servidor de dados (JSON Server)

```bash
npm start
```

Esse comando iniciará o `json-server` em `http://localhost:3000`.

---

### 5. Inicie o servidor de páginas (Live Server)

Abra o arquivo `noticias.html` no navegador usando alguma das opções abaixo:

- Com a extensão **Live Server** no VS Code
- Ou abrindo manualmente o arquivo via navegador

> Exemplo de URL esperada:
```
http://localhost:5500/public/noticias.html
```

---

## 🧪 Estrutura esperada após setup

```
📁 seu-projeto/
├── db/
│   └── db.json
├── noticias_fetcher.js
├── package.json
├── public/
│   ├── noticias.html
│   ├── detalhes_noticia.html
│   ├── css/
│   ├── scripts/
│   └── imgs/
```

---

## 📌 Observações

- O conteúdo das notícias depende dos resultados da **NewsAPI**.
- O `json-server` serve apenas dados (porta 3000), e o Live Server serve os arquivos HTML (porta 5500).