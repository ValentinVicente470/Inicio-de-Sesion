const mongoose = require('mongoose');

const userCollection = 'Users';

const userSchema = new mongoose.Schema({

    username: {type: String, required: true},
    gmail: { type: String, required: true},
    password: { type: String, required: true},
})

const usuarios = mongoose.model(userCollection, userSchema);

module.exports = usuarios;