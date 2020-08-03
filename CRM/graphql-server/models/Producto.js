const mongoose = require("mongoose");

const ProductoSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true,
  },
  existencia: {
    type: Number,
    require: true,
  },
  precio: {
    type: Number,
    require: true,
    trim: true,
  },
  creado: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Producto", ProductoSchema);
