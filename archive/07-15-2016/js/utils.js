function homeClick() {
        window.location = "https://www.littlerojo.com/";
}

function aboutClick() {
        window.location = "https://www.littlerojo.com/about";
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
var raycaster;
var mouse;
var PI2 = Math.PI * 2;

var programFill = function ( context ) {
	context.beginPath();
	context.arc( 0, 0, 0.5, 0, PI2, true );
	context.fill();
};

var programStroke = function ( context ) {
	context.lineWidth = 0.00025;
	context.beginPath();
	context.arc( 0, 0, 0.5, 0, PI2, true );
	context.stroke();
};

var INTERSECTED;
var controls;
function onload() {
	onloadFPS();
	onload744();
	init();
	animate();
}

function init() {
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	container = document.getElementById( 'tojoSquaresContainer' );
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / (window.innerHeight), 1, 900 );
	camera.position.set( 0, 300, 500 );
	scene = new THREE.Scene();

	controls = new THREE.TrackballControls( camera );
	controls.target.set(0,0,0);
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;
	controls.noRotate = false;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;
	controls.keys = [ 65, 83, 68 ];
	controls.addEventListener( 'change', render );

	for ( var i = 0; i < 300; i ++ ) {
		var particle = new THREE.Sprite();
		particle.position.x = Math.random() * 1200 - 600;
		particle.position.y = Math.random() * 1200 - 600;
		particle.position.z = Math.random() * 1200 - 600;
		particle.scale.x = particle.scale.y =  20 + 20;
		particle.material.color = new THREE.Color(0xffffff * Math.random());
		scene.add( particle );
	}
				
	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();
	//renderer = new THREE.CanvasRenderer();
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0x000000);
	renderer.setSize( 140, 140 );
	container.appendChild( renderer.domElement );

	//stats = new Stats();
	//info.appendChild( stats.dom );

	//document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / (window.innerHeight);
	camera.updateProjectionMatrix();
	//renderer.setSize( window.innerWidth-7, window.innerHeight - 90);
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

	var delta = 1;
	//stats.update();
	controls.update(delta);

	renderer.render();
}

var radius = 600;
var theta = 0;

function render() {
	theta += .1;
	camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
	camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
	camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
	camera.lookAt( scene.position );
	camera.updateMatrixWorld();

	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( scene.children );

	if ( intersects.length > 0 ) {
		if ( INTERSECTED != intersects[ 0 ].object ) {
			if ( INTERSECTED ) INTERSECTED.material.program = programStroke;
			INTERSECTED = intersects[ 0 ].object;
			INTERSECTED.material.program = programFill;
		}
	} else {
		if ( INTERSECTED ) INTERSECTED.material.program = programStroke;
		INTERSECTED = null;
	}
	renderer.render( scene, camera );
	//stats.update();
}
