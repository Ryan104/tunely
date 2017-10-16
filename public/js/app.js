/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


$(document).ready(function() {
  console.log('app.js loaded!');

  $.get('/api/albums', (albums) => {
    albums.forEach((album) => {
      renderAlbum(album);
      });
  });

  // new album modal form submit
  $('#newAlbumModal').on('click', '#saveAlbum', function(event){
    // this function gets the form data for a new album
    console.log('clicked');
    let $form = $(this).parent().parent().find('form');
    postAlbumData($form.serialize());
    $form.trigger('reset');
  });

  $('#albums').on('click', '.add-song', function(e) {
      console.log('asdfasdfasdf');
      var id= $(this).parents('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
      console.log('id',id);

      $('#songModal').attr('data-album-id', id);
      $('#songModal').modal();
  });

  $('#songModal').on('click', '#saveSong', handleNewSongSubmit);
});


// this function sends a post request of serialized form data
function postAlbumData(data){
  $.post('/api/albums', data, function(response){
    renderAlbum(response);
  });
}

function handleNewSongSubmit(e) {
  console.log('new song click');
  e.preventDefault();
  let $form = $('#songModal').find('form');
  let id = $('#songModal').attr('data-album-id');
  // get data from modal fields
  let formData = $form.serialize();
  // POST to SERVER
  $.post('/api/albums/' + id + '/songs', formData, function(res){
    //update the correct album to show the new song
    $('.album[data-album-id="' + id+'"').find('.album-songs').html(buildSongsHtml(res.songs));
  });
  // clear form
  $('#songModal').find('form').trigger('reset');
  // close modal
  $('#songModal').modal('toggle');
  

}

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
