const mongoose = require('mongoose');

const msgsCollection = 'mensajes';

const msgsSchema = new mongoose.Schema({
    author: {
        mail: {type: String, required: true},
        nombre: { type: String, required: true},
        apellido: { type: String, required: true},
        edad: { type: Number, required: true},
        alias: { type: String, required: true},
        avatar: { type: String, required: true},
    },
    text : {type: String, required: true},
    fecha: { type: String, required: true},
    hora: {type: String, required:true}
})

const MSGS = mongoose.model(msgsCollection, msgsSchema);

module.exports = MSGS;