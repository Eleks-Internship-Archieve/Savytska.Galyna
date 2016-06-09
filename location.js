var map;

function initMap(location) {
    
    console.log(location);
    
    var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
    var mapOptions =  {
        center: currentLocation,
        zoom: 15
    };
    
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    
    var marker = new google.maps.Marker({
        position: currentLocation,
        map: map
    });
}

navigator.geolocation.getCurrentPosition(initMap);