var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const SongSchema = new Schema({
	name: String,
	trackNumber: Number
});

const AlbumSchema = new Schema({
	artistName: String,
    name: String,
	releaseDate: String,
	genres: [ String ],
	songs: [ SongSchema ]
});

module.exports = mongoose.model('Album', AlbumSchema);