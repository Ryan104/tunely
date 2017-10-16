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

var sampleSongs = [];

sampleSongs.push({ name: 'Famous',
                   trackNumber: 1
});
sampleSongs.push({ name: "All of the Lights",
                   trackNumber: 2
});
sampleSongs.push({ name: 'Guilt Trip',
                   trackNumber: 3
});
sampleSongs.push({ name: 'Paranoid',
                   trackNumber: 4
});
sampleSongs.push({ name: 'Ultralight Beam',
                   trackNumber: 5
});
sampleSongs.push({ name: 'Runaway',
                   trackNumber: 6
});
sampleSongs.push({ name: 'Stronger',
                   trackNumber: 7
});

albumsList = albumsList.map((album) => {
	album.songs = sampleSongs;
	return album;
});

console.log(albumsList);

db.Album.remove({}, function(err, albums){
	if (err){ return console.log(err) };

	db.Album.create(albumsList, function(err, albums){
	    if (err) { return console.log('ERROR', err); }
	    console.log("all albums:", albums);
	    console.log("created", albums.length, "albums");
	    process.exit();
	});
});
