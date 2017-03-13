window.onresize = function(event) {
	cafeMapElement.style.width = ((window.innerWidth / 2) * .75) + "px";
	cafeMapElement.style.height = ((window.innerHeight / 2) * .75) + "px";
	
	candinaMapElement.style.width = ((window.innerWidth / 2) * .75) + "px";
	candinaMapElement.style.height = ((window.innerHeight / 2) * .75) + "px";
}

function start() {
}

function initMap() {
	cafeMapElement = document.getElementById('cafeMap');
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
	
	candinaMapElement = document.getElementById('cantinaMap');
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
}