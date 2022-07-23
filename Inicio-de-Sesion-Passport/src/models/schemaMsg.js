const mongoose = require('mongoose');

const msgCollection = 'mensajes';

const msgSchema = new mongoose.Schema({
    email: {type: String, required: true},
    text : {type: String, required: true},
    fecha: { type: String, required: true},
    hora: {type: String, required:true}
})

const mensajes = mongoose.model(msgCollection, msgSchema);

module.exports = mensajes;