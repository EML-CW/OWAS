const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
Router.use((req,res,next) => {
    const date = new Date();
    console.log(`[🕔] -- ${date.getHours()}:${date.getMinutes()} -> ${req.ip}`);
    next();
});

Router.post('/newbike', (req,res) => {
    if (!req.body.token || !req.body.make || !req.body.model || !req.body.year || !req.body.displacement || !req.body.mileage) {
        res.status(400).send({status: 400, message: "Bad request"});
        return;
    }
    mongoose.model('users').findOne({_arToken: req.body.token}, (err, user) => {
        if (!user || err) {
            res.status(500).send({status: 500, message: 'Could not retrieve the user with the specified token'});
            return;
        }
    })
    const bikeModel = mongoose.model('bikes');
    const newBike = new bikeModel({
        _bikeMake: req.body.make,
        _year: req.body.year,
        _bikeModel: req.body.model,
        _displacement: req.body.displacement,
        _priceArray: [],
        _mileage: req.body.mileage
    });
    newBike.save((err) => {
        if (err) {
            res.status(500).send({status: 500, message: 'internal server error'});
            return;
        } else {
            res.status(200).send({status: 200, message: 'Bike created!'});
            return;
        }
    });
});

Router.post('/deletebike', (req,res) => {
    if (!req.body.make || !req.body.model || !req.body.token) {
        res.status(400).send({status: 400, message: "Bad request"});
        return;
    }
    mongoose.model('users').findOne({_arToken: req.body.token}, (err, user) => {
        if (!user || err) {
            res.status(500).send({status: 500, message: 'Could not retrieve the user with the specified token'});
            return;
        }
    })
    mongoose.model('bikes').deleteOne({_bikeMake: req.body.make, _bikeModel: req.body.model}, (err) => {
        if (!err) {
            res.status(200).send({status: 200, message:"ok"});
            return;
        } else {
            res.status(404).send({status: 404, message: "Could not find the bike to delete"});
            return;
        }
    })
})

module.exports = Router;