var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

window.onresize = function(event) {		
	if(window.innerWidth < 	960) {	
		var menuCellElement = document.getElementById('menuCell'); 
    	menuCellElement.style.visibility = "visible"; 		
     
		var locationCellElement = document.getElementById('locationCell'); 
		locationCellElement.style.visibility = "visible"; 

		var listCellElement = document.getElementById('listCell'); 
    	listCellElement.style.visibility = "hidden";

		var cafeInfoElement = document.getElementById('cafeInfo'); 
		cafeInfoElement.style.fontSize = (window.innerWidth / 32) + "px"; 
		
		var cantinaInfoElement = document.getElementById('cantinaInfo'); 
		cantinaInfoElement.style.fontSize = (window.innerWidth / 32) + "px"; 		
	}
	else {
		var menuCellElement = document.getElementById('menuCell'); 
    	menuCellElement.style.visibility = "hidden"; 
		menuCellElement.style.width = "0px;"
     
		var locationCellElement = document.getElementById('locationCell'); 
		locationCellElement.style.visibility = "hidden";   
		locationCellElement.style.width = "0px;"

		var listCellElement = document.getElementById('listCell'); 
    	listCellElement.style.visibility = "visible";
	}
	
	if(isMobile.any()) {
		 
	}
	else {
		var menuItems = document.getElementsByClassName('menuItem'); 
		for (var a = 0; a < menuItems.length; a++) { 
			menuItems[a].style.fontSize = (window.innerWidth / 500) + "em"; 
		} 
	}
	
	var cafeMapElement = document.getElementById('cafeMap');
	cafeMapElement.style.height = ((window.innerHeight / 2) * .75) + "px";

	var cantinaMapElement = document.getElementById('cantinaMap');
	cantinaMapElement.style.height = ((window.innerHeight / 2) * .75) + "px";
}

function onLoad() {	
	window.onresize();
}

function initMap() {	
	window.onresize();

	var cafeMapElement = document.getElementById('cafeMap');	
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
	cafeMapElement.onclick = function( element ) {
		window.open('https://goo.gl/maps/ZAkHDkL9tGn');
	}

	var cantinaMapElement = document.getElementById('cantinaMap');
	var cantinaBoundary = new google.maps.LatLngBounds();
	var cantinaMap = new google.maps.Map(cantinaMapElement, {
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
	cantinaMapElement.onclick = function( element ) {
		window.open('https://goo.gl/maps/vVtntxYu9f22');
	}

	window.onresize();
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
						  'Error: The Geolocation service failed.' :
						  'Error: Your browser doesn\'t support geolocation.');
  }