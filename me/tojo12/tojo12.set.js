function Set() {
	
}

Set.prototype.Stage = function(canvas, tojo) {
	
	this.mainCanvas = canvas;
	this.renderer = new THREE.WebGLRenderer({ canvas:this.mainCanvas, antilias: true, alpha: true, clearAlpha: 1});
	this.renderer.setPixelRatio( window.devicePixelRatio );
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	this.renderer.setClearColor( 0x000000, 1 );
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.renderReverseSided = false;
	this.renderer.sortObjects = false;
	
	this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000);
	//this.camera.position.set(0, 490, 70);
	this.orbitControls = new THREE.OrbitControls(this.camera);
	this.camera.position.x = -4.8;
	this.camera.position.y = 9.9;
	this.camera.position.z = -4.8;
	this.orbitControls.target = new THREE.Vector3(12000, 9.2, 12000);
	this.fakeCamera = new THREE.Object3D();
	this.vrControls = new THREE.VRControls(this.fakeCamera);
	this.effect = new THREE.VREffect( this.renderer );

    
	//this.controls = new THREE.VRControls( this.camera );
	//this.dolly = new THREE.Group();
    //this.dolly.position.set( 0, -20, 0 );
    	
	//this.tween = new TWEEN.Tween(this.camera.position)
	//App.tween.onComplete(function () {
    //        App.tojo.cameraState = 0;
	//});

	if ( WEBVR.isAvailable() === true ) {
		document.body.appendChild( WEBVR.getButton( this.effect ) );
	}

	this.tojo = tojo;
	this.tojo.SetupScene(); 
    this.tojo.AnimateScene();	
}

Set.prototype.UpdateScene = function () {
 	var id = App.renderer.render(App.tojo.scene, App.camera);
 }

 Set.prototype.CanceScene = function () {
 	cancelAnimationFrame(id);
 }

 function rotateCameraY(radiansIncrement) {
var x = App.camera.position.x; var y = App.camera.position.y; var z = App.camera.position.z;
var signx = x > 0 ? 1 : -1;

// get current radians from z and x coords.
var radians = x == 0 ? Math.PI/2 : Math.atan(z/x);
if (signx == -1) radians += Math.PI;

radians += radiansIncrement;
if (radians > Math.PI*2) radians = radians%(Math.PI*2);
while (radians < 0) radians += Math.PI*2;

var radius = Math.sqrt(x*x + z*z);
App.camera.position.x = radius * Math.cos(radians);
App.camera.position.z = radius * Math.sin(radians);
}