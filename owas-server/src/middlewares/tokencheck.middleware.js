const mongoWrapper = require("../services/mongo.service");

const tokenCheck = (req, res, next) => {
mongoWrapper.findOne("users", {_arToken: req.body.token || req.query.token}, (err, user) => {
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