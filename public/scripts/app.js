

$(document).ready(function(){
console.log("Sanity Check: JS is working!");
var allLandmarks = [];
var marker;

  // $('.parallax').parallax();
  $(document).ready(function(){
    $('.parallax').parallax();
  });


// $.ajax({
//   method: 'GET',
//   url: '/api/landmarks',
//   success: handleSuccess,
//   error: handleError
// });
//
// function handleSuccess(json) {
//   allLandmarks = json;
//   render();
// }
//
// function handleError(e) {
//   console.log('uh oh');
//   // $('#bookTarget').text('Failed to load books, is the server working?');
// }

$('#favoriteForm').on('submit', function(e) {
  e.preventDefault();
  console.log('new landmark!', $(this).serialize());
  var address = document.getElementById('address').value;
  $.ajax({
    method: 'POST',
    url: '/api/landmarks',
    data: $(this).serialize(),
    success: newLandmark,
    error: newLandmarkError
  });
});

function newLandmark(json) {
console.log ("this is json" , json)
  allLandmarks.push(json);
  render();
}
function newLandmarkError() {
  console.log("error");
}


var unsplash_api = "https://api.unsplash.com/search/photos?client_id=8690af73a2e6eef28b8ec898ca3245328210c6d5f48165ed28929570ddb8edf8&page=1&per_page=13"


$('#submit').on('click', function() {
  var address = document.getElementById('address').value;
  $("h2").html(address);
  $("#landmark").val(address);
  $.ajax({
    url: unsplash_api +"&query="+address,
    method: "GET",
    success: function(json) {
      console.log(json);
      $("#queryImg img").remove();

      for(let i=0; i < json.results.length; i++){
         $("#queryImg").append(`<img src=" ${json.results[i].urls.small}"> `);
      }
    },
    error: function(err){
      console.log("ERROR!", err)
    }
  })

});

//GOOGLE MAP
  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: 37.77, lng: -122.44}
    });
    var geocoder = new google.maps.Geocoder();

    // document.getElementById('submit').addEventListener('click', function() {
    $('#submit').on('click', function() {
      geocodeAddress(geocoder, map);
    });
  }

  function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    // setMapOnAll(null);
    if(marker) {
      marker.setMap(null);
    }
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  initMap();


});
