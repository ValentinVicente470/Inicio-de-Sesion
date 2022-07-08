const mongoose = require('mongoose');
const models = require('../models/schemaUser');

mongoose.connect('mongodb+srv://ValentinVicente:kpoctmaster470@cluster0.4hxnz.mongodb.net/Cluster0?retryWrites=true&w=majority')


class Contenedor{
    constructor(){
        this.collection = models;
    }

    async saveUser(username, gmail, password){
        try{
            const newuser = {
                user: username,
                gmail: gmail,
                contra: password,
            }

            const saves = await this.collection.insertMany(newuser);
            return saves
        
        }
        catch(err){
            console.log(`${err} Error en la funcion saveUser`)
        }
    }

    async getUsers(){
        try{
            const gets = await this.collection.find();
            return gets
        }
        catch(err){
            console.log(`${err} Error en la funcion getUsers`)
        }
    }


}

const ContUsers = new Contenedor();

module.exports = ContUsers;