// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var albumsList =[
	{
		artistName: 'Ladyhawke',
		name: 'Ladyhawke',
		releaseDate: '2008, November 18',
		genres: [ 'new wave', 'indie rock', 'synth pop' ]
	},
	{
		artistName: 'The Knife',
		name: 'Silent Shout',
		releaseDate: '2006, February 17',
		genres: [ 'synth pop', 'electronica', 'experimental' ]
    },
    {
        artistName: 'Juno Reactor',
        name: 'Shango',
        releaseDate: '2000, October 9',
        genres: [ 'electronic', 'goa trance', 'tribal house' ]
    },
    {
		artistName: 'Philip Wesley',
		name: 'Dark Night of the Soul',
		releaseDate: '2008, September 12',
		genres: [ 'piano' ]
    }
];

db.Album.remove({}, function(err, albums){
	if (err){ return console.log(err) };

	db.Album.create(albumsList, function(err, albums){
	    if (err) { return console.log('ERROR', err); }
	    console.log("all albums:", albums);
	    console.log("created", albums.length, "albums");
	    process.exit();
	});
});
