const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let posts = [];

// 🔹 Home
app.get('/', (req, res) => {
  res.send('API ONLINE 🚀');
});

// 🔹 LISTAR POSTS
app.get('/posts', (req, res) => {
  res.json(posts);
});

// 🔹 CRIAR POST
app.post('/posts', (req, res) => {
  const { title, content } = req.body;

  const novoPost = {
    id: Date.now(),
    title,
    content
  };

  posts.push(novoPost);

  res.status(201).json(novoPost);
});

// 🔹 EDITAR POST
app.put('/posts/:id', (req, res) => {
  const id = Number(req.params.id);

  const { title, content } = req.body;

  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.status(404).json({
      error: 'Post não encontrado'
    });
  }

  post.title = title;
  post.content = content;

  res.json(post);
});

// 🔹 EXCLUIR POST
app.delete('/posts/:id', (req, res) => {
  const id = Number(req.params.id);

  posts = posts.filter(p => p.id !== id);

  res.json({
    message: 'Post removido'
  });
});

// 🔹 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada'
  });
});

// 🔹 PORTA RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});