const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientsSchema = Schema({
    _clientName: String,
    _clientLastName: String,
    _clientStreet: String,
    _clientCity: String,
    _clientZIP: Number,
    _clientPhone: String
})

mongoose.model('clients', clientsSchema);