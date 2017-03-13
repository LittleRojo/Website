function start() {
	//var element = document.getElementById("body");
	//element.style.height = window.innerHeight + "px";
	//element.style.width = window.innerWidth + "px";
}

function initMap() {
	// Create a map object and specify the DOM element for display.
	var cafeMap = new google.maps.Map(document.getElementById('cafeMap'), {	  
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
		
	var cantinaMap = new google.maps.Map(document.getElementById('cantinaMap'), {
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