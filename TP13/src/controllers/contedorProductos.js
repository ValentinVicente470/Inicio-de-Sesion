const knex = require ('knex')
const  { options }  = require('../connect/connect-mysql.js')

class Contenedor {
    constructor(options) {
        this.knex = knex(options)
    }

    async crearTabla() {
        return this.knex.schema.dropTableIfExists('productos')
            .finally(() => {
                return this.knex.schema.createTable('productos', table => {
                    table.increments('id').primary()
                    table.string('name', 50).notNullable()
                    table.varchar('description', 150).notNullable()
                    table.varchar('code', 10).notNullable()
                    table.float('price')
                    table.varchar('thumbnail', 3000).notNullable()
                })
            })
    }

    async insertarProductos(producto) {
        return this.knex('productos').insert(producto)
    }

    async listarProductos() {
        return this.knex('productos').select('*')
    }

    async close() {
        this.knex.destroy()
    }
}

const ContProds = new Contenedor(options);

module.exports = ContProds;
