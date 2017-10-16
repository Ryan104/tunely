var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tunely", {useMongoClient: true});

module.exports.Album = require('./album');
