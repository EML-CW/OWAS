const mongoose = require('mongoose');

const findOne = (model, conditionData, cb) => {
    mongoose.model(model).findOne(conditionData, (err, data) => {
        cb(err, data);
    })
}

const newEntry = (model, newEntryObject, cb) => {
    const newEntryModel = mongoose.model(model);
    const newEntryData = new newEntryModel({newEntryObject});
    newEntryData.save((err) => {
        if (err) {
            cb(false);
            return;
        }
        cb(true);
    })
}

const findAll = (model, cb) => {
    mongoose.model(model).find((err, listObject) => {
        if (err) {
            cb(null);
            return;
        }
        cb(listObject);
    })
}

module.exports = {
    findOne: findOne,
    findAll: findAll,
    newEntry: newEntry
}