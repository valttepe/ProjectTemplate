const initMap = () =>{
    let myLatLng = {
      lat: 43.6222102,
      lng: -79.6694881,
    };

    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: myLatLng,
    });

    let marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
    });
  };
  google.maps.event.addDomListener(window, 'load', initMap);
