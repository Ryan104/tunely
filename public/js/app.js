/* CLIENT-SIDE JS */

$(document).ready(function() {
  console.log('app.js loaded!');

  // Display all albums from API Call
  getAlbums(renderAlbum);

  /*
      SET CLICK LISTENERS
  */

  $('#newAlbumModal').on('click', '#saveAlbum', handleNewAlbumSubmit);

  $('#albums').on('click', '.delete-album', openDeleteAlbumModal);
  $('#albums').on('click', '.edit-album', openEditModal); // TODO: handle edit and edit modal
  $('#albums').on('click', '.add-song', openNewSongModal);

  $('#deleteAlbumModal').on('click', '#deleteAlbum', handleDeleteAlbum);
  $('#songModal').on('click', '#saveSong', handleNewSongSubmit);
});


/*
    CLICK EVENTS
*/

function openNewSongModal(e) {
  let id = $(this).parents('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
  $('#songModal').attr('data-album-id', id);
  $('#songModal').modal();
}

function openDeleteAlbumModal(e) {
  let id = $(this).parents('.album').data('album-id');
  $('#deleteAlbumModal').attr('data-album-id', id);
  $('#deleteAlbumModal').modal();
}

function handleNewAlbumSubmit(e){
  let $form = $(this).parent().parent().find('form');
  postAlbumData($form.serialize());
  $form.trigger('reset');
}

function handleDeleteAlbum(e){
  let id = $('#deleteAlbumModal').attr('data-album-id');
  $album = $('.album[data-album-id="'+id+'"');
  deleteAlbum(id);
  $album.fadeOut(1000, function(){
      $album.remove();
  });
}

function handleNewSongSubmit(e) {
  e.preventDefault();
  let $form = $('#songModal').find('form');
  let id = $('#songModal').attr('data-album-id');
  
  // get data from modal fields & POST to SERVER
  postSong(id, $form.serialize());

  // clear form & close modal
  $form.trigger('reset');
  $('#songModal').modal('toggle');
}




/*
    AJAX METHODS
*/

// get all albums
function getAlbums(renderHtml){
  $.get('/api/albums', (albums) => {
    albums.forEach((album) => (renderHtml(album)));
  });

}

// post a new album
function postAlbumData(albumData){
  $.post('/api/albums', albumData, (response) => ( renderAlbum(response)));
}

// edit album
function updateAlbum(albumId, albumData){
  $.ajax({
    method: 'put',
    url: '/api/albums/' + albumId,
    success: (res) => (console.log(res))
  });
}

// delete album
function deleteAlbum(albumId){
  $.ajax({
    method: 'delete',
    url: '/api/albums/' + albumId,
    success: (res) => (console.log('deleted'))
  });
}

// post a song to the album with the given ID
function postSong(albumId, songData){
  $.post('/api/albums/' + albumId + '/songs', songData, function(res){
    //update the correct album to show the new song
    $('.album[data-album-id="' + albumId+'"').find('.album-songs').html(buildSongsHtml(res.songs));
  });
}

/*
    HTML RENDER METHODS
*/

// this function takes a single album and renders it to the page
function renderAlbum(album) {
  console.log('rendering album:', album);

  var albumHtml =
  "        <!-- one album -->" +
  "        <div class='row album' data-album-id='" + album._id + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin album internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
  "                     <img src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Album Name:</h4>" +
  "                        <span class='album-name'>" + album.name + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Artist Name:</h4>" +
  "                        <span class='artist-name'>" +  album.artistName + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='album-releaseDate'>" + album.releaseDate + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Songs:</h4>" +
  "                        <div class='album-songs'>" + buildSongsHtml(album.songs) + "</div>" +
  "                      </li>" +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
  "                  <button class='btn btn-danger delete-album'>Delete Album</button>" + 
  "                  <button class='btn btn-info edit-album'>Edit Album</button>" + 
  "                  <button class='btn btn-primary add-song'>Add Song</button>" + 
  "              </div>" +
  "            </div>" +
  "          </div>" +
  "          <!-- end one album -->";

  // render to the page with jQuery
  $('#albums').append(albumHtml);
}

function buildSongsHtml(songs){
  let html = "<ul>";
  songs.forEach((song)=>{
    html += `<li>${song.trackNumber} - ${song.name}`;
  });

  html += "</ul>";
  return html;
}
