cconst express = require('express');
const mongoose = require('mongoose');
const Cliente = require('./models/Cliente');
require('dotenv').config();

const app = express();
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri)
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch((err) => console.log('Erro na conexão com MongoDB:', err));

app.post('/clientes', async (req, res) => {
  try {
    await Cliente.create(req.body);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send('Erro ao cadastrar cliente');
  }
});

app.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).send('Erro ao listar clientes');
  }
});

app.put('/clientes', async (req, res) => {
  try {
    const { _id, ...rest } = req.body;
    const cliente = await Cliente.findByIdAndUpdate(_id, rest, { new: true });
    res.json(cliente);
  } catch (error) {
    res.status(500).send('Erro ao atualizar cliente');
  }
});

app.delete('/clientes', async (req, res) => {
  try {
    const { _id } = req.body;
    await Cliente.findByIdAndDelete(_id);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send('Erro ao deletar cliente');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});