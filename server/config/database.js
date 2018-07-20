var env = process.env.NODE_ENV || 'production',
    config = require('./config')[env],
    mongoose = require('mongoose');
var {MongoClient} = require('mongodb');
var ItemModel = require('../models/item');
module.exports = function () {
    mongoose.Promise = global.Promise;
    var db = mongoose.connect(config.db);
    mongoose.connection.on('error', function (err) {
        console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
    }).on('open', function () {
        console.log('Connection extablised with MongoDB')
    })
    //console.log(ItemModel.find({item:"rage"}));
    return db;
};