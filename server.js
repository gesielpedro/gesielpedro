const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Banco em memória (temporário)
let posts = [];

// 🔹 Rota raiz (teste)
app.get('/', (req, res) => {
  res.send('API ONLINE 🚀');
});

// 🔹 GET - listar posts
app.get('/posts', (req, res) => {
  res.json(posts);
});


// Servir frontend (seu index.html)
app.use(express.static(__dirname));

// 🔹 POST - criar post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Título e conteúdo são obrigatórios' });
  }

  const novoPost = {
    id: Date.now(),
    title,
    content
  };

  posts.push(novoPost);

  res.status(201).json(novoPost);
});

// 🔹 Rota fallback (evita "Not Found" genérico)
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// 🔹 PORTA CORRETA PARA RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});