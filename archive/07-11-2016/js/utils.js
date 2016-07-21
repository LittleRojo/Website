function homeClick() {
        window.location = "https://www.littlerojo.com/";
}

function aboutClick() {
        window.location = "https://www.littlerojo.com/about";
}

function timerRun() {
	var element = document.getElementById("cell");
	units = getUnits(Clock.now());
	element.innerText = units.toString();
}

function getUnits(startDate) {
	var units = 0;

	<!--SECONDS 0/15/30/45-->
        if(startDate.second % 15 == 0) {
 	       units++;
        }

        <!--MINUTES 0/15/30/45-->
        if(startDate.minute % 15 == 0) {
        	units++;
        }

        <!--HOURS 0/3/6/9/12/15/18/21-->
        if(startDate.hour % 3 == 0) {
        	units++;
        }

        <!--MONTH 0/3/6/9/12-->
        if(startDate.month % 3 == 0) {
        	units++;
        }

        return units;
}

var container, stats;
var camera, scene, renderer;
var geometry, material, cube;

function onload() {
	setInterval(timerRun, 1000);
	init();
}

function init() {
	container = document.getElementById( 'mainCanvas' );
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight*.9 );
	container.appendChild( renderer.domElement );

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);

	geometry = new THREE.BoxGeometry(200,200,200);
	material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
	cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
	camera.position.z = 1000;    
	
	render()
}

function onWindowResize() {
	camera.aspect = window.innerWidth / (window.innerHeight);
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth-7, window.innerHeight - 90);
}

function onDocumentMouseMove( event ) {
	event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / (window.innerHeight) ) * 2 + 1;
}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	requestAnimationFrame( render );
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render( scene, camera );	
}
