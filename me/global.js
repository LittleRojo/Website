window.addEventListener( 'resize', onWindowResize, false );

function onload(){
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
		
		//IPHONE ORIENTATION - PROFILE
		if(window.orientation === 90 || window.orientation === -90) {
		}

		//IPHONE ORIANTATION - LANDSCAPE
		else {  		
		}
	}

	//WEB APP LINKING	
	if(("standalone" in window.navigator) && window.navigator.standalone) {
		//IPHONE ORIENTATION - PROFILE
		if(window.orientation === 90 || window.orientation === -90) {
			var title = document.getElementById( 'navigation' );
			title.style.left = window.innerWidth / 2 - 50;
			title.style.top = "4px";
			title.style.visibility = "visible";

			var main = document.getElementById( 'mainCanvas' );
			main.style.top = "20px";			
		}

		//IPHONE ORIANTATION - LANDSCAPE
		else {  
			var title = document.getElementById( 'navigation' );
			title.style.left = window.innerWidth / 2 - 50;
			title.style.top = "18px";
			title.style.visibility = "visible";

			var main = document.getElementById( 'mainCanvas' );
			main.style.top = "38px";
		} 	    
	}
	else {
		var title = document.getElementById( 'navigation' );
		title.style.left = window.innerWidth / 2 - 50;
		title.style.top = "1px";
		title.style.visibility = "visible";

		var main = document.getElementById( 'mainCanvas' );
		main.style.top = "20px";
	}

	var speed = document.getElementById( 'speed' );
	speed.style.width = (window.innerWidth - 120) / 3.2;
	speed.style.left = 25;
	speed.style.top = window.innerHeight - 25;
	speed.style.visibility = "visible";

	var camera = document.getElementById( 'camera' );
	camera.style.width = (window.innerWidth - 120) / 3.2;
	camera.style.left = ((window.innerWidth - 120) / 5.5) * 2 + 24;
	camera.style.top = window.innerHeight - 25;
	camera.style.visibility = "visible";

	var oddball = document.getElementById( 'oddball' );
	oddball.style.width = (window.innerWidth - 120) / 3.2;
	oddball.style.left = ((window.innerWidth - 120) / 5.5) * 4 + 26;
	oddball.style.top = window.innerHeight - 25;
	oddball.style.visibility = "visible";

	var sound = document.getElementById( 'soundButton' );
	sound.style.left = window.innerWidth - 60;
	sound.style.top = window.innerHeight - 42.5;
	sound.style.visibility = "visible";

	App = new Set();
	var tojo = new tojo10();
	App.Stage(main, tojo);
}

var xRoot = .00386699;
var yRoot = .00386699;
var zRoot = .00386699; 
var animationRoot = .00386699;
function updateSpeed(button) {
	App.tojo.animationSpeed = animationRoot * button.value * 440;

	var speed = document.getElementById( 'speed' );
	speed.style.opacity =  (speed.value / 2) * .7 + .3;
}

function updateCamera(button) {
	xStepFactor = xRoot * button.value
	yStepFactor = yRoot * button.value
	zStepFactor = zRoot * button.value;

	var speed = document.getElementById( 'speed' );
	camera.style.opacity =  (speed.value / 2) * .7 + .3;
}

function updateOddball(button) {
}

function onWindowResize(){
    App.camera.aspect = window.innerWidth / window.innerHeight;
    App.camera.updateProjectionMatrix();

	if(("standalone" in window.navigator) && window.navigator.standalone) {
		//IPHONE ORIENTATION - PROFILE
		if(window.orientation === 90 || window.orientation === -90) {			
			var main = document.getElementById( 'mainCanvas' );
			main.style.top = "38px";	
			var title = document.getElementById( 'navigation' );
			title.style.left = window.innerWidth / 2 - 50;
			title.style.top = "18px";		
			App.renderer.setSize( window.innerWidth, window.innerHeight - 82 );
		}

		//IPHONE ORIANTATION - LANDSCAPE
		else {
			var main = document.getElementById( 'mainCanvas' );
			main.style.top = "20px";
			var title = document.getElementById( 'navigation' );
			title.style.left = window.innerWidth / 2 - 50;
			title.style.top = "-1px";
			App.renderer.setSize( window.innerWidth, window.innerHeight - 64 );	
		} 
		
	}
	else {		
		var main = document.getElementById( 'mainCanvas' );
		main.style.top = "20px";
		App.renderer.setSize( window.innerWidth, window.innerHeight - 64 );

		var title = document.getElementById( 'navigation' );
		title.style.left = window.innerWidth / 2 - 50;
	}

	var speed = document.getElementById( 'speed' );
	speed.style.width = (window.innerWidth - 120) / 3.2;
	speed.style.left = 25;
	speed.style.top = window.innerHeight - 25;

	var camera = document.getElementById( 'camera' );
	camera.style.width = (window.innerWidth - 120) / 3.2;
	camera.style.left = ((window.innerWidth - 120) / 5.5) * 2 + 24;
	camera.style.top = window.innerHeight - 25;
	camera.style.visibility = "visible";

	var oddball = document.getElementById( 'oddball' );
	oddball.style.width = (window.innerWidth - 120) / 3.2;
	oddball.style.left = ((window.innerWidth - 120) / 5.5) * 4 + 26;
	oddball.style.top = window.innerHeight - 25;
	oddball.style.visibility = "visible";

	var sound = document.getElementById( 'soundButton' );
	sound.style.left = window.innerWidth - 60;
	sound.style.top = window.innerHeight - 42;
}

function play() {
	if(App.audiostate == 0){     
		App.audio.play();
		App.audiostate = 1;
		var img = document.getElementById('soundButton')
		img.src = "img/play.png";
	}
	else {
		App.audio.pause();
		App.audiostate = 0;
		var img = document.getElementById('soundButton')
		img.src = "img/off.png";
	}
}