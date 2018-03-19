

$(document).ready(function(){
console.log("Sanity Check: JS is working!");

var unsplash_api = "https://api.unsplash.com/search/photos?client_id=68b75d68a2c82df131747fe097b9c8350a9c53442c1d891c93387908ee966653&page=1&per_page=13"

document.getElementById('submit').addEventListener('click', function() {
  var address = document.getElementById('address').value;
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
