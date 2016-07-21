var container, stats;
var camera, scene, renderer;
var raycaster;
var mouse;
var PI2 = Math.PI * 2;
var INTERSECTED;
var controls;

function onload() {
	init();
	animate();
}

function init() {
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	container = document.getElementById( 'footerCanvas' );
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / (window.innerHeight), 1, 900 );
	camera.position.set( 0, 300, 500 );
	scene = new THREE.Scene();

	mouse = new THREE.Vector2();
	renderer = new THREE.CanvasRenderer();
	renderer.setClearColor(0xFFFFFF);
	renderer.setSize( window.innerWidth, 20 );
	//container.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / (window.innerHeight);
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth-7, window.innerHeight - 90);
	controls.handleResize();
}

/*
function onDocumentMouseMove( event ) {
	event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / (window.innerHeight) ) * 2 + 1;
}
*/

function animate() {
	requestAnimationFrame( animate );
	render();
	renderer.render();
}

function render() {
	renderer.render( scene, camera );
}


