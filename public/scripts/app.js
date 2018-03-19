

$(document).ready(function(){
console.log("Sanity Check: JS is working!");

var unsplash_api = "https://api.unsplash.com/search/photos?client_id=8690af73a2e6eef28b8ec898ca3245328210c6d5f48165ed28929570ddb8edf8&page=1"

document.getElementById('picsubmit').addEventListener('click', function() {
  $.ajax({
    url: unsplash_api +"&query=cats",
    method: "GET",
    success: function(taco) {
      console.log(taco)
    },
    error: function(err){
      console.log("ERROR!", err)
    }
  })

});

// //UNSPLASH
// import Unsplash from 'unsplash-js';
//
// // require syntax
// const Unsplash = require('unsplash-js').default;
//
// const unsplash = new Unsplash({
//   applicationId: "22894",
//   secret: "77a3c692003ea8fe6fc3a69c14ec944a491157afa58e77137a6c8896df54214a",
//   callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
// });
//
// const authenticationUrl = unsplash.auth.getAuthenticationUrl([
//   "public",
//   "read_user",
//   "write_user",
//   "read_photos",
//   "write_photos"
// ]);
// location.assign(authenticationUrl);
//
// unsplash.auth.userAuthentication(query.code)
//   .then(toJson)
//   .then(json => {
//     unsplash.auth.setBearerToken(json.access_token);
//   });
//
//   unsplash.users.profile("naoufal")
//   .catch(err => {
//     console.log("error damn it")
//   });



//GOOGLE MAP
  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: 37.77, lng: -122.44}
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function() {
      geocodeAddress(geocoder, map);
    });
  }

  function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
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
