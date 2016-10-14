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

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000);
    this.camera.position.set(0, 0, 70);
	this.camera.up = new THREE.Vector3(0,1,0);    
    
	this.mouse = new THREE.TrackballControls( this.camera );
	this.mouse.rotateSpeed = 3;
	this.mouse.zoomSpeed = 1.2;
	this.mouse.panSpeed = 0.8;
	this.mouse.noZoom = false;
	this.mouse.noPan = false;
	this.mouse.noRotate = false;
	this.mouse.staticMoving = false;
	this.mouse.dynamicDampingFactor = 0.9;
	this.mouse.addEventListener( 'change', this.UpdateScene );

	this.tween = new TWEEN.Tween(this.camera.position)
	
	this.tojo = tojo;
	this.tojo.SetupScene(); 
    this.tojo.AnimateScene();
	
   	/*this.vrDisplay = null;
		navigator.getVRDisplays().then(function(displays) {
			if (displays.length > 0) {
				App.vrDisplay = displays[0];
				App.tojo.AnimateScene();
			}
	});*/ 
}

function setOrientationControls(e) {
    if (!e.alpha) {
        return;
    }
    this.mouse = new THREE.DeviceOrientationControls(App.camera, true);
    this.mouse.connect();
    this.mouse.update();
    window.removeEventListener('deviceorientation', setOrientationControls, true);
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