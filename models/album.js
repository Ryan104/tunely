var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const AlbumSchema = new Schema({
	artistName: String,
    name: String,
	releaseDate: String,
	genres: [ String ]
});

module.exports = mongoose.model('Album', AlbumSchema);