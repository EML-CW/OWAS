const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationsSchema = Schema({
    _bikeId: String,
    _clientId: String,
    _from: Date,
    _to: Date
})

mongoose.model('reservations', reservationsSchema);