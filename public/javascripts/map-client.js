let map;
let infowindow;

const initMap = () => {
    // Sello location
  // let location = {lat: 60.218208, lng: 24.811968};

  // Pasila
  let location = {lat: 60.198981, lng: 24.932845};

  map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 15,
  });

  infowindow = new google.maps.InfoWindow();

  let service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: location,
    radius: 5000,
    keyword: ['jalkapallokenttä'],
  }, callback);
};

const callback = (results, status) => {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
        // console.log(results[i]);
        createMarker(results[i]);
    }
  }
};
const eventList = (place) => {
  const addEvent = document.querySelector('#add-event');
  addEvent.addEventListener('click', (evt) => {
    console.log(place.id);
    window.location.href= '/add-event?id=' + place.id;
  });
  const list = document.querySelector('#openList');
  list.addEventListener('click', (evt) => {
    window.location.href = '/list?id=' + place.id;
  });
};

const createMarker = (place) => {
  let placeLoc = place.geometry.location;
  let marker;
  marker = new google.maps.Marker({
    map: map,
    position: placeLoc,
  });

  google.maps.event.addListener(marker, 'click', () => {
    // console.log(place);
    // InfoWindow content
    let infoContent = '<div id="content">'
    + '<p>' + place.name + '</p>'
    + '<button type="button" id="openList"> Events </button>'
    + '<button type="button" id="add-event"> Add new </button>'
    + '<div>';
    infowindow.setContent(infoContent);
    infowindow.open(map, marker);
    eventList(place);
  });
};
  google.maps.event.addDomListener(window, 'load', initMap);
