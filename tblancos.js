window.onresize = function(event) {	
	cafeMapElement = document.getElementById('cafeMap');
	cafeMapElement.style.height = ((window.innerHeight / 2) * .75) + "px";

	cantinaMapElement = document.getElementById('cantinaMap');
	cantinaMapElement.style.height = ((window.innerHeight / 2) * .75) + "px";
	
	footerTableElement = document.getElementById('footerTable');
	footerTableElement.style.top = (window.innerHeight - 45) + "px";
	
	if(window.innerWidth < 	960) {	
		cafeInfoElement = document.getElementById('cafeInfo');
		cafeInfoElement.style.fontSize = (window.innerWidth / 32) + "px";
		
		cantinaInfoElement = document.getElementById('cantinaInfo');
		cantinaInfoElement.style.fontSize = (window.innerWidth / 32) + "px";
	}
	
	var menuTableElement = document.getElementById('menuTable');
	menuTableElement.style.height = (window.innerWidth / 25) + "px"
}

function onLoad() {
	window.onresize();
}

function initMap() {	
	window.onresize();
	return;
	var cafeBoundary = new google.maps.LatLngBounds();
	var cafeMap = new google.maps.Map(cafeMapElement, {	  
	  center: { lat: 32.407716, lng: -94.716789 },
	  scrollwheel: true,
	  zoom: 10
	});		
	var cafeMapTraffic = new google.maps.TrafficLayer();
        cafeMapTraffic.setMap(cafeMap);		
	var cafeMarker = new google.maps.Marker({
	  position: { lat: 32.407716, lng: -94.716789 },
	  map: cafeMap,
	  title: 'T.Blanco\'s Cafe'
	});	
	var cafeGPS = new google.maps.LatLng(cafeMarker.position.lat(), cafeMarker.position.lng());
	
	var cantinaBoundary = new google.maps.LatLngBounds();
	var cantinaMap = new google.maps.Map(candinaMapElement, {
		center: { lat: 32.956175, lng: -96.830576 },
		scrollwheel: true,
		zoom: 10
	});
	var cantinaMapTraffic = new google.maps.TrafficLayer();
        cantinaMapTraffic.setMap(cantinaMap);	
	var cantinaMarker = new google.maps.Marker({
	  position: { lat: 32.956175, lng: -96.830576 },
	  map: cantinaMap,
	  title: 'T.Blanco\'s Cantina'
	});
	var cantinaGPS = new google.maps.LatLng(cantinaMarker.position.lat(), cantinaMarker.position.lng());
	
	var infoWindow = new google.maps.InfoWindow({map: cafeMap});

	if (navigator.geolocation) {				
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
			  lat: position.coords.latitude,
			  lng: position.coords.longitude
			};

			infoWindow.setPosition(pos);
			infoWindow.setContent('Location found.');
			cafeMap.setCenter(pos);
		}, function(error) {
			handleLocationError(true, infoWindow, cafeMap.getCenter());
		});
	} else {
	  handleLocationError(false, infoWindow, cafeMap.getCenter());
	}
	
	window.onresize();
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
						  'Error: The Geolocation service failed.' :
						  'Error: Your browser doesn\'t support geolocation.');
  }