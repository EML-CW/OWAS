const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const mongoWrapper = require('../services/mongo.service');
const bodyParser = require('body-parser');
const token = require('../middlewares/tokencheck.middleware');

Router.use((req,res,next) => {
    const date = new Date();
    console.log(`[🕔] -- ${date.getHours()}:${date.getMinutes()} -> ${req.ip}`);
    next();
});

Router.post('/newbike', token.tokenCheck, (req,res) => {
    if (!req.body.token || !req.body.make || !req.body.model || !req.body.year || !req.body.displacement || !req.body.mileage) {
        res.status(400).send({status: 400, message: "Bad request"});
        return;
    }
    mongoWrapper.newEntry("bikes", {
        _bikeMake: req.body.make,
        _year: req.body.year,
        _bikeModel: req.body.model,
        _displacement: req.body.displacement,
        _priceArray: [],
        _mileage: req.body.mileage
    }, (success) => {
        if (success) {
            res.status(200).send({stauts: 200, message:"ok"});
            return;
        }
        res.status(500).send({status: 500, messagze: "Internal server error"});
    });
});

Router.get('/fetchbikes', token.tokenCheck, (req, res) => {
    if (!req.query.token) {
        res.status(400).send({status: 400, message: "Bad request"});
        return;
    }
    mongoWrapper.findAll("bikes", (list) => {
        if (!list) {
            res.status(500).send({status: 500, message:"An error occurred"});
            return;
        }
        res.status(200).send({status: 200, message:"ok", list: list})
        return;
    })
})

Router.post('/editbike', token.tokenCheck, (req,res) => {
    if (!req.body.token || !req.body.id || !req.body.make || !req.body.model || !req.body.mileage || !req.body.displacement) {
        res.status(400).send({status: 400, message:"Bad request"});
        console.log(req.body);
        return;
    }
    const updatedValues = {
        _bikeMake: req.body.make,
        _bikeModel: req.body.model,
        _displacement: req.body.displacement,
        _mileage: req.body.mileage
    }
    mongoWrapper.updateById("bikes", req.body.id, updatedValues, (result, err) => {
        if (err) {
            res.status(500).send({status: 500, message: "Internal server error", error: err});
            return;
        }
        res.status(200).send({status: 200, message: "ok"});
    })
})

Router.post('/deletebike', token.tokenCheck, (req,res) => {
    if (!req.body.id || !req.body.token) {
        res.status(400).send({status: 400, message: "Bad request"});
        return;
    }
    mongoWrapper.deleteOne("bikes", {_id: req.body.id}, (success) => {
        if (success) {
            res.status(200).send({status: 200, message:"ok"});
            return;
        }
        res.status(404).send({status: 404, message: "Could not find the bike to delete"});
    });
})

module.exports = Router;
