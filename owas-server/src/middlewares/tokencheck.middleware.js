const mongoose = require('mongoose')

const tokenCheck = (req, res, next) => {
mongoose.model('users').findOne({_arToken: req.body.token}, (err, user) => {
    if (!user || err) {
        res.status(500).send({status: 500, message: 'Could not retrieve the user with the specified token'});
        return;
    }
    next();
})

}

module.exports = {
    tokenCheck: tokenCheck
};