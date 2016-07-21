var container744, stats744;
var camera744, scene744, renderer744;
var geometry744, material744, cube744;

function onload744() {
	init744();
	animate744();
}

function init744() {
	container744 = document.getElementById( 'container744' );
	renderer744 = new THREE.WebGLRenderer();
	renderer744.setSize( 150, 150 );
	container744.appendChild( renderer744.domElement );

	scene744 = new THREE.Scene();
	camera744 = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);

	geometry744 = new THREE.BoxGeometry(200,200,200);
	material744 = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
	cube744 = new THREE.Mesh(geometry744, material744);
	scene744.add(cube744);
	camera744.position.z = 1000;    
	
	render744()
}

function animate744() {
	requestAnimationFrame( animate744 );
	render744();
}

function render744() {
	//requestAnimationFrame( render744 );
	cube744.rotation.x += 0.01;
	cube744.rotation.y += 0.01;
	renderer744.render( scene744, camera744 );	
}
