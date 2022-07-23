const mongoose = require('mongoose');

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    user: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
})

const usuarios = mongoose.model(userCollection, userSchema);

module.exports = usuarios;