const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nome: String,
  sobreNome: String
});

module.exports = mongoose.model('Cliente', ClienteSchema);