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

	var down = document.getElementById( 'downButton' );
	down.style.left = 60;
	down.style.top = window.innerHeight - 46;
	down.style.visibility = "visible";

	var sound = document.getElementById( 'soundButton' );
	sound.style.left = window.innerWidth / 2 - 3;
	sound.style.top = window.innerHeight - 46;
	sound.style.visibility = "visible";

	var up = document.getElementById( 'upButton' );
	up.style.left = window.innerWidth - 60;
	up.style.top = window.innerHeight - 46;
	up.style.visibility = "visible";

	var main = document.getElementById( 'mainCanvas' );
	main.style.right = window.innerWidth - 20;

	App = new Set();
	var tojo = new tojo10();
	App.Stage(main, tojo);
	//App.Sound = new Sound();
	//App.Sound.Load();
	//App.Sound.Play();
}

function updateSpeed(button) {
	var speed = 0;
	if(button.id == "downButton") {
		speed = .8;
	}
	else if(button.id == "upButton") {
		speed = 1.2;
	}
	if(App.tojo.animationSpeed > 1.8 && speed == 1.2) {
		return;
	}
	if(App.tojo.animationSpeed <.1 && speed == .8) {
		return;
	}
	App.tojo.animationSpeed = App.tojo.animationSpeed * speed;
	xStepFactor = xStepFactor * speed;
	yStepFactor = yStepFactor * speed;
	zStepFactor = zStepFactor * speed;
}

function onWindowResize(){
    App.camera.aspect = window.innerWidth / window.innerHeight;
    App.camera.updateProjectionMatrix();
    App.renderer.setSize( window.innerWidth, window.innerHeight );	

	var title = document.getElementById( 'navigation' );
	title.style.left = window.innerWidth / 2 - 50;
	title.style.visibility = "visible";
	
	var down = document.getElementById( 'downButton' );
	down.style.left = window.innerWidth - 40;
	down.style.visibility = "visible";

	var up = document.getElementById( 'upButton' );
	up.style.left = window.innerWidth - 20;
	up.style.visibility = "visible";
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