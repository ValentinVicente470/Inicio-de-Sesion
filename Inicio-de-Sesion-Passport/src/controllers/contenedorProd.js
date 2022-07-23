const mongoose = require('mongoose');

const models = require('../models/schemaProd.js');

const moment = require('moment');

mongoose.connect('mongodb+srv://ValentinVicente:kpoctmaster470@cluster0.4hxnz.mongodb.net/Cluster0?retryWrites=true&w=majority')


class Contenedor {
    constructor() {
        this.coleccion = models
    }

    async updateById(productId, {name, description, price, stock, thumbnail}) {
        try {
            const update = await this.coleccion.findOneAndUpdate({ id: productId },{name: name, description: description, price: price, stock: stock, thumbnail: thumbnail});
            return update;
        }
        catch (err) {
            console.log('Error en la funcion updateById ', err);
        }
    }


    async saveProd({name, description, price, stock, thumbnail}) {
        try {
            const objs = await this.getProds();
            let newId = 1;
            if (objs.length > 0) {
                newId = objs[objs.length - 1].id + 1;
            }
            console.log(`nuevo producto creado con id ${newId}`)
            const newObj = {
                id: newId,
                name: name,
                description: description,
                price: price,
                stock: stock,
                thumbnail: thumbnail,
                timestamp: moment().format('YYYY-MM-DD HH:mm:ss')
            }
            const add = await this.coleccion.insertMany(newObj)
            return add;
        } catch (err) {
            console.log('Error en la funcion saveProd ', err);
        }
    };

    async deleteById(idProducto) {
        try {
            const deleteById = this.coleccion.findOneAndDelete({id: idProducto})
            return deleteById;
        } catch (err) {
            console.log('Error en la funcion deleteById ', err);
        }
    }

    async getProdById(idProducto) {
        try {
            const obj = await this.coleccion.find({id: idProducto})
            return obj
        } catch (err) {
            console.log('Error en la funcion getProdById ', err);
        }
    }

    async getProds() {
        try {
            const objs = await this.coleccion.find()
            return objs;
        } catch (err) {
            console.log('Error en la funcion getProds ', err);
        }
    }
};

const prod = new Contenedor();

module.exports = prod;