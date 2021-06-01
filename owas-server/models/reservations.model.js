const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationsSchema = Schema({
    _bikeID: String,
    _bikeReservations: Array
})

mongoose.model('reservations', reservationsSchema);