function onload(){
	var title = document.getElementById( 'navigation' );
	title.style.left = window.innerWidth / 2 - 50;
	title.style.visibility = "visible";

	var animationSpeedLabel = document.getElementById( 'animationSpeedLabel' );
	//animationSpeedLabel.style.left = window.innerWidth -120;
	animationSpeedLabel.style.visibility = "visible";

	var animationSpeed = document.getElementById( 'animationSpeed' );
	//cameraSpeed.style.left = window.innerWidth - 60;
	animationSpeed.style.visibility = "visible";

	var cameraSpeedLabel = document.getElementById( 'cameraSpeedLabel' );
	cameraSpeedLabel.style.left = window.innerWidth -120;
	cameraSpeedLabel.style.visibility = "visible";

	var cameraSpeed = document.getElementById( 'cameraSpeed' );
	cameraSpeed.style.left = window.innerWidth - 60;
	cameraSpeed.style.visibility = "visible";

	var main = document.getElementById( 'mainCanvas' );
	main.style.right = window.innerWidth - 20;
	App = new Set();
	var tojo = new tojo10();
	App.Stage(main, tojo);
	//App.Sound = new Sound();
	//App.Sound.Load();
	//App.Sound.Play();
}

function updateAnimationSpeed(slider) {
	App.tojo.animationSpeed = slider.value;
}

function updateCameraSpeed(slider) {
	xStepFactor = slider.value;
	yStepFactor = slider.value;
	zStepFactor = slider.value;
}