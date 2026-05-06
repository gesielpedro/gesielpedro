const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let posts = [];

// GET - listar posts
app.get('/posts', async (req, res) => {
  res.json({ ok: true });
});

// POST - criar post
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

app.listen(3000, () => {
  console.log('API rodando em http://localhost:3000');
});