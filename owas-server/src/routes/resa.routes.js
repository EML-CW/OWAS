const express = require('express');
const Router = express.Router();
const mongoWrapper = require('../services/mongo.service')
const bodyParser = require('body-parser');
const token = require('../middlewares/tokencheck.middleware');
const { tokenCheck } = require('../middlewares/tokencheck.middleware');

Router.use((req, res, next) => {
    const date = new Date();
    console.log(`[🕔] -- ${date.getHours()}:${date.getMinutes()} -> ${req.ip}`);
    next();
});

Router.post('/newreservation', token.tokenCheck, (req, res) => {
    if (!req.body.token || !req.body.clientId || !req.body.bikeId || !req.body.from || !req.body.to) {
        res.status(400).send({status: 400, message: "Bad request"});
        return;
    }
    const from = new Date(req.body.from);
    const to = new Date(req.body.to);
    mongoWrapper.newEntry('reservations', {
        _bikeId: req.body.bikeId,
        _clientId: req.body.clientId,
        _from: new Date(req.body.from),
        _to: new Date(req.body.to)
    }, (success) => {
        if (success) {
            res.status(200).send({status: 200, message: "Ok."})
            return;
        }
        res.status(500).send({status: 500, message: "Internal server error"});
        return;
    })
})

Router.post('/deletereservation', token.tokenCheck, (req,res) => {
    if (!req.body.token || !req.body.reservationId) {
        res.status(400).send({status: 400, message: "Bad request"});
        return;
    }
    mongoWrapper.deleteOne('reservations', {_id: req.body.reservationId}, (success) => {
        if (success) {
            res.status(200).send({status: 200, message: "Ok."});
            return;
        }
        res.status(500).send({status: 500, message: "Internal server error."});
        return;
    })
})

Router.post('/updatereservation', token.tokenCheck, (req, res) => {
    if (!req.body.token || !req.body.reservationId || !req.body.clientId || !req.body.bikeId || !req.body.from || !req.body.to) {
        res.status(400).send({status: 400, message: "Bad request"});
        return;
    }
    mongoWrapper.updateById('reservations', req.body.reservationId, {
        _bikeId: req.body.bikeId,
        _clientId: req.body.clientId,
        _from: req.body.from,
        _to: req.body.to
    }, (success) => {
        success ? res.status(200).send({status: 200, message:"Ok."}) : res.status(500).send({status: 500, message: "Internal server error"});
        return;
    })
})

Router.get('/getreservations', token.tokenCheck, (req,res) => {
    if (!req.query.token) {
        console.log(req.query.token);
        res.status(400).send({status: 400, message: "Bad request"});
        return;
    }
    console.log(req.query.token);
    mongoWrapper.findAll('reservations', (list) => {
        res.status(200).send({status: 200, message: "ok", list: list});
        return;
    })
})

module.exports = Router;