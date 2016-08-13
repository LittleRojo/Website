var container, stats;
var camera, scene, renderer;
var raycaster;
var mouse;
var PI2 = Math.PI * 2;
var controls;

function onloadOjo() {
	initOjo();
	animateOjo();
}

function initOjo() {
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	container = document.getElementById( 'canvasOjo' );
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / (window.innerHeight), 1, 900 );
	camera.position.set( 0, 300, 500 );
	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0x000000);
	renderer.setSize( 140, 140 );
}



function animateOjop() {
	requestAnimationFrame( animateOjo );
	renderOjo();

	renderer.render();

}

function renderOjo() {
	renderer.render( scene, camera );
}


