const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path'); // Adicionando módulo 'path' para manipulação de caminhos

const app = express();

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'database.db'); // Caminho para o arquivo de banco de dados
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      descricao TEXT,
      preco REAL
    )
  `);
});

app.get('/produtos', (req, res) => {
  db.all('SELECT * FROM produtos', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/produtos', (req, res) => {
  const { nome, descricao, preco } = req.body;

  db.run(
    'INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)',
    [nome, descricao, preco],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco } = req.body;

  db.run(
    'UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?',
    [nome, descricao, preco, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ changes: this.changes });
    }
  );
});

app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM produtos WHERE id = ?', id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

module.exports = app;

