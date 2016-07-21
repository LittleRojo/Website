var scene, camera, renderer;
var geometry, material, mesh;

function onload() {
	init();
	animate();
}

function facebookClick() {
	window.location = "http://www.facebook.com/littlerojo101";
}

function twitterClick() {
	window.location = "https://www.twitter.com/littlerojo101";
}

function aboutClick() {
	window.location = "https://www.littlerojo.com/about";
}

function changeLinkColor(element, color) {
	element.style.color = color;	
}

function init() {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1000;

	geometry = new THREE.BoxGeometry( 200, 200, 200 );
	material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	var canvas = document.getElementById("mainCanvas");
	renderer = new THREE.WebGLRenderer( { canvas: canvas } );
	renderer.setSize( window.innerWidth*.9, window.innerHeight*.9 );
}

function animate() {
	requestAnimationFrame( animate );

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;

	renderer.render( scene, camera );
}
