const express = require('express');
const mongoose = require('mongoose');
const Cliente = require('./models/Cliente');
const app = express();

app.use(express.json());

// Conexão com MongoDB local
mongoose.connect('mongodb://localhost:27017/clientesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// POST - Cadastrar cliente
app.post('/clientes', async (req, res) => {
  try {
    await Cliente.create(req.body);
    res.sendStatus(200); // Requisito: sem corpo na resposta
  } catch (error) {
    res.status(500).send('Erro ao cadastrar cliente');
  }
});

// GET - Listar todos os clientes
app.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).send('Erro ao listar clientes');
  }
});

// PUT - Atualizar cliente
app.put('/clientes', async (req, res) => {
  try {
    const { _id, ...rest } = req.body;
    const cliente = await Cliente.findByIdAndUpdate(_id, rest, { new: true });
    res.json(cliente);
  } catch (error) {
    res.status(500).send('Erro ao atualizar cliente');
  }
});

// DELETE - Remover cliente
app.delete('/clientes', async (req, res) => {
  try {
    const { _id } = req.body;
    await Cliente.findByIdAndDelete(_id);
    res.sendStatus(200); // Requisito: sem corpo na resposta
  } catch (error) {
    res.status(500).send('Erro ao deletar cliente');
  }
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// DELETE - Remover cliente
app.delete('/clientes', async (req, res) => {
const { _id } = req.body;
await Cliente.findByIdAndDelete(_id);
res.sendStatus(200);
});

// Iniciar servidor
const port = 3000;
app.listen(3000, () => {
console.log('Servidor rodando em http://localhost:3000/clientes');
});

app.listen(port, () => {
console.log(`API rodando em http://localhost:${port}`);
});