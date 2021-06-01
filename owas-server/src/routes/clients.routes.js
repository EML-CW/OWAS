const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const token = require('../middlewares/tokencheck.middleware');

Router.use((req,res,next) => {
    const date = new Date();
    console.log(`[🕔] -- ${date.getHours()}:${date.getMinutes()} -> ${req.ip}`);
    next();
});

Router.post('/newclient', token.tokenCheck, (req, res) => {
    if (!req.body.token || !req.body.clientName || !req.body.clientLastName || !req.body.clientStreet ||
            !req.body.clientCity || !req.body.clientZIP) {
        res.status(400).send({status: 400, message: "Bad request"});
        return;
    }
    const clientSchema = mongoose.model('clients');
    const newClient = new clientSchema({
        _clientName: req.body.clientName,
        _clientLastName: req.body.clientLastName,
        _clientStreet: req.body.clientStreet,
        _clientCity: req.body.clientCity,
        _clientZIP: req.body.clientZIP
    })
    newClient.save((err) => {
        if (err) {
            res.status(500).send({status: 500, message: 'internal server error'});
            return;
        } else {
            res.status(200).send({status: 200, message: 'Client created!'});
            return;
        }
    });
})

Router.get('/fetchclientlist', token.tokenCheck, (req,res) => {
    if (!req.query.token) {
        res.status(400).send({status: 400, message: "Bad request"});
        return;
    }
    mongoose.model('clients').find((err, list) => {
        res.status(200).send({status: 200, message: 'Ok', clientList: {list}});
        return;
    })
})

module.exports = Router;