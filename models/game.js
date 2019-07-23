'use strict'
const credentials = require("../models/credentials");
const mongoose = require('mongoose');

mongoose.connect(credentials.connectionString, { dbName: "ameerdb", useNewUrlParser: true });

mongoose.connection.on('open', () => {
    console.log('Mongoose connected.');
});

// define Book model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
    gameName: { type: String, required: true },
    type: String,
    level: String
});

module.exports = mongoose.model('Game', mySchema);
