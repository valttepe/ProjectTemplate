let map;
let infowindow;

const initMap = () => {
  let pyrmont = {lat: 60.218208, lng: 24.811968};

  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15,
  });

  infowindow = new google.maps.InfoWindow();
  let service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: pyrmont,
    radius: 5000,
    keyword: ['jalkapallokenttä'],
  }, callback);
}

const callback = (results, status) => {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
        console.log(results[i]);
        createMarker(results[i]);
    }
  }
}

const createMarker = (place) => {
  let placeLoc = place.geometry.location;
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, 'click', () => {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
  google.maps.event.addDomListener(window, 'load', initMap);
