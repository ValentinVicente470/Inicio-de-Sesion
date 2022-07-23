const mongoose = require('mongoose');

const prodCollection = 'productos';

const prodSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    name: { type: String, required: true},
    description: { type: String, required: true},
    price: { type: Number, required: true},
    stock: { type: Number, required: true},
    thumbnail: { type: String, required: true},
    timestamp: { type: Date, required: true}
})

const productos = mongoose.model(prodCollection, prodSchema);

module.exports = productos;