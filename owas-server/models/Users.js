const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = Schema({
    _username: String,
    _password: String,
    _email: String,
    _arToken: String,
    _privileges: Number
})

mongoose.model('users', usersSchema);