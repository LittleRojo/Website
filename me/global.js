window.addEventListener( 'resize', onWindowResize, false );

var page;
function onload(pageNumber){
	page = pageNumber;
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
			//title.style.left = window.innerWidth / 2 - 50;
			//title.style.top = "4px";
			//title.style.visibility = "visible";

			var main = document.getElementById( 'mainCanvas' );
			//main.style.top = "20px";			
		}

		//IPHONE ORIANTATION - LANDSCAPE
		else {  
			var title = document.getElementById( 'navigation' );
			//title.style.left = window.innerWidth / 2 - 50;
			//title.style.top = "18px";
			//title.style.visibility = "visible";

			var main = document.getElementById( 'mainCanvas' );
			//main.style.top = "38px";
		} 	    
	}
	else {
		/*var title = document.getElementById( 'navigation' );
		title.style.left = window.innerWidth / 2 - 50;
		title.style.top = "1px";
		title.style.visibility = "visible";*/

		var main = document.getElementById( 'mainCanvas' );
		//main.style.top = "20px";
	}

	App = new Set();
	if(page == "10") { 
		var tojo = new tojo10(); 

		var speed = document.getElementById( 'speed' );
		speed.style.width = ((window.innerWidth - 0) / 3);
		speed.style.left = 0;
		speed.style.top = window.innerHeight - 25;
		speed.style.visibility = "visible";

		var camera = document.getElementById( 'camera' );
		camera.style.width = ((window.innerWidth - 0) / 3);
		camera.style.left = ((window.innerWidth - 0) / 3);
		camera.style.top = window.innerHeight - 25;
		camera.style.visibility = "visible";

		var oddball = document.getElementById( 'oddball' );
		oddball.style.width = ((window.innerWidth - 0) / 3);
		oddball.style.left = ((window.innerWidth - 0) / 3) * 2;
		oddball.style.top = window.innerHeight - 25;
		oddball.style.visibility = "visible";
	}
	else if(page == "11") { 
		var tojo = new tojo11();
	}
	App.Stage(main, tojo);

	var mainCanvas = document.getElementById( 'mainCanvas' );
	mainCanvas.style.visibility = 'visible';
}

var xRoot = .00386699;
var yRoot = .00386699;
var zRoot = .00386699; 
var animationRoot = .00386699;
function updateCamera(button) {
	App.tojo.animationSpeed = animationRoot * button.value * 440;

	//var speed = document.getElementById( 'speed' );
	//speed.style.opacity =  (speed.value / 2) * .7 + .3;
}

function updateSpeed(button) {
	xStepFactor = xRoot * button.value
	yStepFactor = yRoot * button.value
	zStepFactor = zRoot * button.value;

	//var speed = document.getElementById( 'speed' );
	//camera.style.opacity =  (speed.value / 2) * .7 + .3;
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

	if(page == "10") {
		var speed = document.getElementById( 'speed' );
		speed.style.width = ((window.innerWidth - 0) / 3);
		speed.style.left = 0;
		speed.style.top = window.innerHeight - 25;

		var camera = document.getElementById( 'camera' );
		camera.style.width = ((window.innerWidth - 0) / 3);
		camera.style.left = ((window.innerWidth - 0) / 3);
		camera.style.top = window.innerHeight - 25;
		camera.style.visibility = "visible";

		var oddball = document.getElementById( 'oddball' );
		oddball.style.width = ((window.innerWidth - 0) / 3);
		oddball.style.left = ((window.innerWidth - 0) / 3) * 2;
		oddball.style.top = window.innerHeight - 25;
		oddball.style.visibility = "visible";

		//var sound = document.getElementById( 'soundButton' );
		//sound.style.left = (((window.innerWidth - ((((window.innerWidth - 100) / 3) * 3))) / 2) - 19) + ((window.innerWidth - 100) / 3) * 3;
		//sound.style.top = window.innerHeight - 42;
	}
	else if(page == "11") {
		
	}
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