const mongoose = require('mongoose');

const findOne = (model, conditionData, cb) => {
    mongoose.model(model).findOne(conditionData, (err, data) => {
        cb(err, data);
    })
}

const updateById = (model, id, updatedvalue, cb) => {
    mongoose.model(model).updateOne({_id: id}, updatedvalue, (err, res) => {
        if (err) {
            cb(false, err);
            return;
        }
        cb(true, null);
    })
}

const newEntry = (model, newEntryObject, cb) => {
    const newEntryModel = mongoose.model(model);
    const newEntryData = new newEntryModel(newEntryObject);
    newEntryData.save((err) => {
        if (err) {
            console.log(err);
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

const deleteOne = (model, conditionData, cb) => {
    mongoose.model(model).deleteOne(conditionData, (err) => {
        if (err)
            cb(false);
        cb(true);
    })
}

module.exports = {
    findOne: findOne,
    deleteOne: deleteOne,
    findAll: findAll,
    newEntry: newEntry,
    updateById: updateById
}