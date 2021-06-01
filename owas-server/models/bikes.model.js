const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = Schema({
    _bikeMake: String,
    _bikeModel: String,
    _year: Number,
    _displacement: String,
    _priceArray: Array,
    _mileage: Number
})

mongoose.model('bikes', usersSchema);