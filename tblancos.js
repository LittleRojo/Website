function start() {
	//var element = document.getElementById("buffer");
	//element.style.height = window.innerHeight + "px";
}

function initMap() {
	// Create a map object and specify the DOM element for display.
	var map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 32.956175, lng: -96.830576},
	  scrollwheel: true,
	  zoom: 8
	});
}