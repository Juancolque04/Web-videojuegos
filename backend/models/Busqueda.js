const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const busquedaSchema = new Schema({
  nombreJuego: { type: String, required: true },
  fechaHora: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Busqueda', busquedaSchema);