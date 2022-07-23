const mongoose = require('mongoose');

const models = require('../models/schemaMsg');

mongoose.connect('mongodb+srv://ValentinVicente:kpoctmaster470@cluster0.4hxnz.mongodb.net/Cluster0?retryWrites=true&w=majority')


class Contenedor {
    constructor(){
        this.collection = models;
    }

    async saveMsj(email, mensaje, fecha, hora){

        const newMsg = {
            email: email,
            text: mensaje,
            fecha: fecha,
            hora: hora
        }

        const saves = await this.collection.insertMany(newMsg)
        return saves
    };

    async getMsg(){
        const gets = await this.collection.find()
        return gets
    }
};


const message = new Contenedor()
module.exports = message;