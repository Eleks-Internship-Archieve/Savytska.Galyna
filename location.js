var map;
var service;
var placeSearch, autocomplete;
var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initMap(location) {
    
    console.log(location);  
    
    var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);

    var mapOptions =  {
        center: currentLocation,
        zoom: 15
    };
    
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    
   var input = (document.getElementById('autocomplete'));
    var types = document.getElementById('type-selector');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);
    
    autocomplete = new google.maps.places.Autocomplete(
        (input),
        {types: ['geocode']});
        autocomplete.addListener('place_changed', fillInAddress);
   
    
    

  
  
    var infowindow = new google.maps.InfoWindow(); 
    var markerLoc = new google.maps.Marker({
        map: map,
        position: currentLocation
  });
    
    var marker = new google.maps.Marker({
    map: map    
  });
    
    
    


function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17); 
    }
 
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    
  for (var component in componentForm) {
    document.getElementById(component).value = '';
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
} 
    
    
    
 
    
    
    function setupClickListener(id, types) {
    var radioButton = document.getElementById(id);
    radioButton.addEventListener('click', function() {
      autocomplete.setTypes(types);
    });
  }

  setupClickListener('changetype-all', []);
  setupClickListener('changetype-address', ['address']);
  setupClickListener('changetype-establishment', ['establishment']);
  setupClickListener('changetype-geocode', ['geocode']);
  }

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  

navigator.geolocation.getCurrentPosition(initMap);
