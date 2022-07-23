const mongoose = require('mongoose');

const models = require('../models/schemaUser');

mongoose.connect('mongodb+srv://ValentinVicente:kpoctmaster470@cluster0.4hxnz.mongodb.net/Cluster0?retryWrites=true&w=majority')


class Contenedor {
    constructor(){
        this.collection = models;
    }

    async saveUser({user, email, password}){

        const newUser = {
            user: user,
            email: email,
            password: password,
        }

        const saves = await this.collection.insertMany(newUser)
        return saves
    };

    
    async getUser(email) {
        try {
            const obj = await this.getUsers()
            console.log(obj)
            for (const user of obj) {
                if (user.email === email){
                    return user;
                }
            }
            return false
        } catch (err) {
            console.log('Error en la funcion getUser ', err);
        }
    }

    async getUsers(){
        const gets = await this.collection.find()
        return gets
    }
};


const users = new Contenedor()
module.exports = users;
