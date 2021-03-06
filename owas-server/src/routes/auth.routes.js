const express = require('express');
const Router = express.Router();
const mongoWrapper = require('../services/mongo.service');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const tokenhdl = require('../services/token.service');
const str = require('@supercharge/strings');

Router.use((req,res,next) => {
    const date = new Date();
    console.log(`[🕔] -- ${date.getHours()}:${date.getMinutes()} -> ${req.ip}`);
    next();
});

Router.use(bodyParser.urlencoded({ extended: false }))

Router.post('/register', (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.email) {
        res.status(400).send({status: 400, message: 'Bad request'});
        console.log(`[❌] - /register -> Bad request`);
        return;
    }
    mongoWrapper.findOne("users", {_email: req.body.email}, (err, user) => {
        if (user) {
            res.status(402).send({status: 402, message: 'User already exists'});
            return;
        }
        const pwdHash = crypto.createHash('sha256').update(req.body.password).digest('base64');
        mongoWrapper.newEntry("users", {
            _username: req.body.username,
            _email: req.body.email,
            _password: pwdHash
        }, (success) => {
            if (success) {
                res.status(200).send({status: 200, message: "ok"});
                return;
            }
            res.status(500).send({status: 500, message: "An error occurred"});
        })
    })
});

Router.post('/login', (req,res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({status: 400, message: 'Bad request'});
        console.log(`[❌] - /login -> Bad request`);
        return;
    }
    mongoWrapper.findOne("users", {_email: req.body.email}, (err, user) => {
        if (!user) {
            res.status(404).send({status: 400, message: 'User not found'});
            return;
        }
        if (!tokenhdl.checkHash(req.body.password, user._password)) {
            res.status(401).send({status: 401, message: 'Unauthorized'})
        } else {
            const newToken = tokenhdl.genToken();
            user._arToken = newToken;
            user.save();
            res.status(200).send({status: 200, message: 'Logged in!', _arToken: newToken, username: user._username});
            console.log(`[✅] - Logged in!`)
        }
    })
})

Router.post('/retrieve', (req, res) => {
    if (!req.body.token) {
        res.status(400).send({status: 400, message: 'Bad request'});
        return;
    }
    mongoWrapper.findOne("users", {_arToken: req.body.token}, (err, user) => {
        if (!user || err) {
            res.status(404).send({status: 404, message: 'Could not retrieve the user with the specified token'});
            return;
        } else {
            console.log(`[✅] - User ${user._email} logged back in via previous token`);
            res.status(200).send({status: 200, message: 'OK', email: user._email, token: user._arToken, activeServices: user._tokens, username: user._username});
            return;
        }
    })
})


module.exports = Router;
