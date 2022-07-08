const mongoose = require('mongoose');
const models = require('../models/schemaMsgs');

mongoose.connect('mongodb+srv://ValentinVicente:kpoctmaster470@cluster0.4hxnz.mongodb.net/Cluster0?retryWrites=true&w=majority')


class Contenedor{
    constructor(){
        this.collection = models;
    }

    async saveMSG(autor, mensaje, fecha, hora){
        try{
            const newmsg = {
                author: autor,
                text: mensaje,
                fecha: fecha,
                hora: hora,
            }

            const saves = await this.collection.insertMany(newmsg);
            return saves
        
        }
        catch(err){
            console.log(`${err} Error en la funcion saveMSG`)
        }
    }

    async getMSGS(){
        try{
            const gets = await this.collection.find();
            return gets
        }
        catch(err){
            console.log(`${err} Error en la funcion getMSGS`)
        }
    }

}

const ContMsg = new Contenedor();

module.exports = ContMsg;