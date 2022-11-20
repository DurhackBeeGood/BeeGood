let map, infoWindow;
let marker;
let dataset;
let hours, type, postcode;


function initMap() {
    // load in dataset of charities
    var svgMarker = {
        path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
        fillColor: "blue",
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 2,
        anchor: new google.maps.Point(15, 30),
      };
    map = new google.maps.Map(document.getElementById('map'),{
        center: location,
        zoom: 15 // city level
    });
    infoWindow = new google.maps.InfoWindow();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
  
            infoWindow.setPosition(pos);
            infoWindow.setContent("You are Here");
            infoWindow.open(map);
            map.setCenter(pos);
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
        for (let i=0; i < dataset.length;i++){
            if (hours !== null){
                if (dataset[i].volHoursPerWeek<hours){
                    continue;
                }
            }
            if (type !== null){
                if (dataset[i].type!==type){
                    continue;
                }
            }
            if (dataset[i].volHoursPerWeek>10){
                svgMarker.fillColor = 'red';
            } else if (dataset[i].volHoursPerWeek>5){
                svgMarker.fillColor='orange';
            } else if (dataset[i].volHoursPerWeek>2) {
                svgMarker.fillColor = 'green';
            } else {
                svgMarker.fillColor = 'grey';
            }
            marker.push(new google.maps.Marker({
                position: {lat:dataset[i].latitude, lng:dataset[i].latitude},
                icon: svgMarker,
                map: map,
              }));
        }
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }

};

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }

window.initMap=initMap;

document.getElementById('home_btn').addEventListener('click', () => {
    var select1 = document.getElementById('HourSelect');
    var select2 = document.getElementById('TypeSelect');
    postcode = document.getElementById('postcode');
    hours = select1.options[select1.selectedIndex].text;
    type = select2.option[select2.selectedIndex].text;
});