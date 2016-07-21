var container, stats;
var camera, scene, renderer;
var raycaster;
var mouse;
var PI2 = Math.PI * 2;
var controls;

function onloadFPS() {
	initFPS();
	animateFPS();
}

function initFPS() {
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	container = document.getElementById( '2dCanvasFPS' );
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / (window.innerHeight), 1, 900 );
	camera.position.set( 0, 300, 500 );
	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0x000000);
	renderer.setSize( 140, 140 );
	//container.appendChild( renderer.domElement );

	stats = new Stats();
	//info.appendChild( stats.dom );

	//document.addEventListener( 'mousemove', onDocumentMouseMove, false );
}

function animateFPS() {
	requestAnimationFrame( animateFPS );
	renderFPS();
	stats.update();
	renderer.render();
}

function renderFPS() {
	renderer.render( scene, camera );
}


