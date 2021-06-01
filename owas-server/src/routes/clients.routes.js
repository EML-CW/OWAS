const express = require('express');
const Router = express.Router();
const mongoWrapper = require('../services/mongo.service')
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
    mongoWrapper.newEntry("clients", {
        _clientName: req.body.clientName,
        _clientLastName: req.body.clientLastName,
        _clientStreet: req.body.clientStreet,
        _clientCity: req.body.clientCity,
        _clientZIP: req.body.clientZIP
    }, (success) => {
        if (success) {
            res.status(200).send({status: 200, message: "ok"});
            return;
        }
        res.status(500).send({status: 500, message: "An error occurred"});
    })
})

Router.get('/fetchclientlist', token.tokenCheck, (req,res) => {
    if (!req.query.token) {
        res.status(400).send({status: 400, message: "Bad request"});
        return;
    }
    mongoWrapper.findAll("clients", (list) => {
        res.status(200).send({status: 200, message: 'Ok', clientList: {list}});
        return;
    })
})

module.exports = Router;