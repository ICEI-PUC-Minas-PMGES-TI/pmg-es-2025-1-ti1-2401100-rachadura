const express = require('express');
const path = require('path');
const jsonServer = require('json-server');

const app = express();
const apiRouter = jsonServer.router(path.join(__dirname, 'data', 'db.json'));
const middlewares = jsonServer.defaults();

app.use(middlewares);

// Servir arquivos estáticos (CSS, JS, imagens)
app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));

// Servir páginas HTML
app.use('/views', express.static(path.join(__dirname, 'public', 'views')));

// Servir a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'home_page.html'));
});

// Servir a API do JSON Server em /api
app.use('/api', apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Servidor rodando na porta', port);
});
