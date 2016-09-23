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
	speed.style.width = window.innerWidth - 120;
	speed.style.left = 25;
	speed.style.top = window.innerHeight - 25;
	speed.style.visibility = "visible";

	var sound = document.getElementById( 'soundButton' );
	sound.style.left = window.innerWidth - 65;
	sound.style.top = window.innerHeight - 42.5;
	sound.style.visibility = "visible";

	App = new Set();
	var tojo = new tojo10();
	App.Stage(main, tojo);
	//App.Sound = new Sound();
	//App.Sound.Load();
	//App.Sound.Play();
}

var xRoot = .00386699;
var yRoot = .00386699;
var zRoot = .00386699; 
var animationRoot = .00386699;
function updateSpeed(button) {
	App.tojo.animationSpeed = animationRoot * button.value * 440;
	xStepFactor = xRoot * button.value
	yStepFactor = yRoot * button.value
	zStepFactor = zRoot * button.value;

	var speed = document.getElementById( 'speed' );
	if(speed.value < 5) {
		//speed.style.background =  0x00ff00;
	}
	else {
		//speed.style.background = 0x0000ff;
	}	
}

function onWindowResize(){
    App.camera.aspect = window.innerWidth / window.innerHeight;
    App.camera.updateProjectionMatrix();

	if(("standalone" in window.navigator) && window.navigator.standalone) {
		//IPHONE ORIENTATION - PROFILE
		if(window.orientation === 90 || window.orientation === -90) {
			App.renderer.setSize( window.innerWidth, window.innerHeight - 70 );
			var main = document.getElementById( 'mainCanvas' );
			main.style.top = "38px";	
			var title = document.getElementById( 'navigation' );
			title.style.left = window.innerWidth / 2 - 50;
			title.style.top = "18px";		
		}

		//IPHONE ORIANTATION - LANDSCAPE
		else {
			var main = document.getElementById( 'mainCanvas' );
			main.style.top = "20px";
			var title = document.getElementById( 'navigation' );
			title.style.left = window.innerWidth / 2 - 50;
			title.style.top = "-1px";
			App.renderer.setSize( window.innerWidth, window.innerHeight - 65 );	
		} 
		
	}
	else {		
		var main = document.getElementById( 'mainCanvas' );
		main.style.top = "20px";
		App.renderer.setSize( window.innerWidth, window.innerHeight - 65 );

		var title = document.getElementById( 'navigation' );
		title.style.left = window.innerWidth / 2 - 50;
	}

	var speed = document.getElementById( 'speed' );
	speed.style.width = window.innerWidth - 120;
	speed.style.left = 25;
	speed.style.top = window.innerHeight - 23;

	var sound = document.getElementById( 'soundButton' );
	sound.style.left = window.innerWidth - 65
	sound.style.top = window.innerHeight - 42.5;
}

var audio = new Audio('media/rhythm.m4a');
var state = 0;
function play() {
	if(state == 0){     
		//audio.play();
		state = 1;
		var img = document.getElementById('soundButton')
		img.src = "img/play.png";
	}
	else {
		//audio.pause();
		state = 0;
		var img = document.getElementById('soundButton')
		img.src = "img/off.png";
	}
}