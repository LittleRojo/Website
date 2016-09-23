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
	
	var title = document.getElementById( 'navigation' );
	title.style.left = window.innerWidth / 2 - 50;
	title.style.visibility = "visible";
	
	var speedLabel = document.getElementById( 'speedLabel' );
	speedLabel.style.left = window.innerWidth - 110;
	speedLabel.style.visibility = "visible";

	var speed = document.getElementById( 'speed' );
	speed.style.left = window.innerWidth - 60;
	speed.style.visibility = "visible";

	var main = document.getElementById( 'mainCanvas' );
	main.style.right = window.innerWidth - 20;
	App = new Set();
	var tojo = new tojo10();
	App.Stage(main, tojo);
	//App.Sound = new Sound();
	//App.Sound.Load();
	//App.Sound.Play();
}

function updateSpeed(slider) {
	App.tojo.animationSpeed = slider.value * 400;
	xStepFactor = slider.value * 3;
	yStepFactor = slider.value * 3;
	zStepFactor = slider.value * 3;
}

function onWindowResize(){
    App.camera.aspect = window.innerWidth / window.innerHeight;
    App.camera.updateProjectionMatrix();
    App.renderer.setSize( window.innerWidth, window.innerHeight );	

	var title = document.getElementById( 'navigation' );
	title.style.left = window.innerWidth / 2 - 50;
	title.style.visibility = "visible";
	
	var speedLabel = document.getElementById( 'speedLabel' );
	speedLabel.style.left = window.innerWidth - 110;
	speedLabel.style.visibility = "visible";

	var speed = document.getElementById( 'speed' );
	speed.style.left = window.innerWidth - 60;
	speed.style.visibility = "visible";
}

var audio = new Audio('media/twinkle.m4a');
var state = 0;
function play() {
	if(state == 0){     
		audio.play();
		state = 1;
		var img = document.getElementById('soundButton')
		img.src = "img/play.png";
	}
	else {
		audio.pause();
		state = 0;
		var img = document.getElementById('soundButton')
		img.src = "img/off.png";
	}
}