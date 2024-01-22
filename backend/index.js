const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const produtos = [];

app.get('/produtos', (req, res) => {
  res.json(produtos);
});

app.post('/produtos', (req, res) => {
  const { nome, descricao, preco } = req.body;

  const novoProduto = {
    id: produtos.length + 1, // Gerar um ID simples (pode ser melhorado para evitar colisões)
    nome,
    descricao,
    preco,
  };

  produtos.push(novoProduto);

  res.json({ id: novoProduto.id });
});

app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco } = req.body;

  const produtoIndex = produtos.findIndex((produto) => produto.id === id);

  if (produtoIndex === -1) {
    res.status(404).json({ error: 'Produto não encontrado' });
    return;
  }

  produtos[produtoIndex] = {
    id: Number(id),
    nome,
    descricao,
    preco,
  };

  res.json({ changes: 1 });
});

app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;

  const produtoIndex = produtos.findIndex((produto) => produto.id === id);

  if (produtoIndex === -1) {
    res.status(404).json({ error: 'Produto não encontrado' });
    return;
  }

  produtos.splice(produtoIndex, 1);

  res.json({ changes: 1 });
});

module.exports = app;