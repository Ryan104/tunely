// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();

// setup bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/
const db = require('./models');


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"},
      {method: "GET", path: "/api/albums", description: "Index: JSON containing all albums"},
      {method: "POST", path: "/api/albums", description: "Create: Add a new album to the DB"},
      {method: "GET", path: "/api/albums/:id", description: "Show: JSON contain the album with the given id"},
      {method: "POST", path: "/api/albums/:id/songs", description: "Create: add a new song to the album with the given id"}
    ]
  });
});

app.get('/api/albums', function album_index(req, res){
  db.Album.find({}, (err, albums) => {
    if (err) {return console.log(err);}
    res.json(albums);
  });
});

app.post('/api/albums', (req, res) => {
  // convert genres to array
  req.body.genres = req.body.genres.split(',');
  console.log(req.body);

  // save the album in the db
  db.Album.create(req.body, (err, album) => {
    res.json(album);
  });
});

app.get('/api/albums/:id', (req, res) => {
  db.Album.findOne({_id: req.params.id}, (err, album) => {
    res.json(album);
  });
});

app.post('/api/albums/:id/songs', (req, res) => {
  db.Album.findOne({_id: req.params.id}, (err, album) => {
    if (err){ return console.log(err); }
    album.songs.push(req.body);
    album.save();
    res.json(album);
  });
  
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
