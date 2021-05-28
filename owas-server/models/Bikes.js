const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = Schema({
    _bikeMake: String,
    _bikeModel: String,
    _displacement: String,
    _priceArray: Array,
})

mongoose.model('bikes', usersSchema);