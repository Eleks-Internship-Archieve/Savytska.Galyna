var map;
var service;
function initMap(location) {
    
    console.log(location);  
    
    var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);

    var mapOptions =  {
        center: currentLocation,
        zoom: 15
    };
    
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    
    var markerLoc = new google.maps.Marker({
    map: map,
    position: currentLocation
  });
    
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: currentLocation,
        radius: 10000, 
        types: ['school']
    }, callback);
}

function callback(results, status) {    
    console.log(results);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var marker = new  google.maps.Marker({
    map: map,
    position: results[i].geometry.location
  });
    }
  }
}


navigator.geolocation.getCurrentPosition(initMap);
