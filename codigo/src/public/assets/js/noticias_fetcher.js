// noticias_fetcher.js
const fs = require('fs');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const API_KEY = 'aade571ed815437291f6c3832e130c35';

// Categorias relacionadas ao seu sistema de denúncias
const categorias = [
  'iluminação pública',
  'buraco na rua',
  'esgoto a céu aberto',
  'barulho urbano',
  'sinalização de trânsito',
  'enchente',
  'alagamento' 
];

// Busca notícias para uma categoria específica
async function buscarNoticias(categoria) {
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(categoria)}&language=pt&apiKey=${API_KEY}`;

  const resposta = await fetch(url);
  const dados = await resposta.json();

  if (dados.status !== 'ok') {
    console.error(`Erro ao buscar notícias para "${categoria}":`, dados.message);
    return [];
  }

  return dados.articles.slice(0, 3).map((artigo, i) => ({
    id: Date.now() + Math.floor(Math.random() * 1000) + i,
    categoria,
    titulo: artigo.title || 'Sem título',
    resumo: artigo.description || 'Sem resumo.',
    conteudo: artigo.content || artigo.description || 'Conteúdo não disponível.',
    data: artigo.publishedAt?.split('T')[0] || '2025-06-01',
    link: artigo.url
  }));
}

// Função principal que atualiza o db.json
(async () => {
  let todasNoticias = [];

  for (const categoria of categorias) {
    console.log(`Buscando notícias sobre: ${categoria}`);
    const noticias = await buscarNoticias(categoria);
    todasNoticias = todasNoticias.concat(noticias);
  }

  const dbPath = './data/db.json';
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  db.noticias = todasNoticias;

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log(`✔ Notícias salvas com sucesso em ${dbPath}`);
})();
