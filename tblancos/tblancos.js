var menuClick = 0;

$(window).click(function(element) {
	var listCellElement = document.getElementById('listCell2'); 
	if (listCellElement && menuClick == 0) {
		listCellElement.style.visibility = "hidden";
	}
	if(menuClick == 1) {
		menuClick = 0;
	}
});

$('#container').click(function(event){
    event.stopPropagation();
});

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
	if(window.innerWidth < 	1200) {		
		var topMenuIcon = document.getElementById('topMenuIcon');
		if( topMenuIcon ) {
			topMenuIcon.style.visibility = "visible";
		}

		var topMenu = document.getElementById('topMenu');
		if(topMenu) {
			topMenu.style.visibility = "hidden";
		}		
	}
	else {
		var topMenuIcon = document.getElementById('topMenuIcon');
		if( topMenuIcon ) {
			topMenuIcon.style.visibility = "hidden";
		}

		var topMenu = document.getElementById('topMenu');
		if(topMenu) {
			topMenu.style.visibility = "visible";
		}
	}	

	var content = document.getElementById('content'); 
	if (content) {
		content.style.position = "absolute";
		content.style.top = "50px";
		content.style.width = window.innerWidth + "px";
		content.style.height = window.innerHeight - 100 + "px";
		content.style.visibility = "visible"; 
	}

	var footer = document.getElementById('footer'); 
	if (footer) {
		footer.style.top = window.innerHeight - 50 + "px";
		footer.style.visibility = "visible"; 		
	}	

	var container = document.getElementById('container'); 
	if (container) {
		container.style.bottom = "10px";
		container.style.width = window.innerWidth + "px";
		container.style.height = window.innerHeight - 150 + "px";
		container.style.visibility = "visible"; 		
	}
}

function onLoad() {	
	window.onresize();
}

function showMenu() {
	menuClick = 1;
	var listCellElement = document.getElementById('sideMenu'); 
	if (listCellElement && listCellElement.style.visibility == "hidden") {
		listCellElement.style.visibility = "visible";
	}
	else if (listCellElement && listCellElement.style.visibility == "visible") {
		listCellElement.style.visibility = "hidden";
	}
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