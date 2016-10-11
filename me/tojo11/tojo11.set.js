function Set() {
	
}

Set.prototype.Stage = function(canvas, tojo) {
	
	this.mainCanvas = canvas;
	this.renderer = new THREE.WebGLRenderer({ canvas:this.mainCanvas, antilias: true, alpha: true, clearAlpha: 1});
	this.renderer.setPixelRatio( window.devicePixelRatio );
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	this.renderer.setClearColor( 0x000000, 1 );
	this.renderer.shadowMap.enabled = true;
	this.renderer.shadowMap.type = THREE.PCFShadowMap;
	this.renderer.shadowMapBias = 0.0039;
	this.renderer.shadowMapDarkness = 0.5;

    this.effect = new THREE.StereoEffect(this.renderer, { 
        eyeSeparation: 10
    });
    //this.effect.SetSize(window.innerWidth, window.innerHeight);


    /*this.effect = new THREE.OculusRiftEffect(this.renderer, {
        worldScale: 1000
    });
    this.effect.setSize(window.innerWidth, window.innerHeight);*/
	//this.projector = new THREE.Projector();
	//this.raycaster = new THREE.Raycaster();

	this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / (window.innerHeight), 1, 50000 );	
	this.camera.position.set(0, 0, 20);
    this.camera.rotation.y = .01;

	//this.camera.up = new THREE.Vector3(0,0,1);
	//this.camera.lookAt(new THREE.Vector3(0,0,0));
	this.camera.destination = new THREE.Vector3(0,0,0);
	this.camera.origin = new THREE.Vector3(0,0,0);

    this.camera2 = new THREE.PerspectiveCamera( 45, window.innerWidth / (window.innerHeight), 1, 50000 );	
	this.camera2.position.set(0, 5, 20);


	//window.camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -1000, 1000 );
	//window.camera.position.set( 20, 120, 992 );
	//window.camera.lookAt(new THREE.Vector3(0, 0, 0));

	//window.keyboard = new THREEx.KeyboardState();
	/*var element = this.renderer.domElement;
	this.mouse = new THREE.OrbitControls(camera, element);
    this.mouse.target.set(
        this.camera.position.x + 0.15,
        this.camera.position.y,
        this.camera.position.z
    );
    this.mouse.noPan = true;
    this.mouse.noZoom = true;
    
    window.addEventListener('deviceorientation', setOrientationControls, true);*/
    
    if (navigator.getVRDisplays) {
        // This object will be populated with the VRDisplay's pose and matricies
        // every frame. We allocate it once here to avoid unnecessary garbage
        // creation per frame.
        frameData = new VRFrameData();

        navigator.getVRDisplays().then(function (displays) {
          // Use the first display in the array if one is available. If multiple
          // displays are present you may want to present the user with a way to
          // select which display they wish to use.
          if (displays.length > 0) {
            vrDisplay = displays[0];

            // Being able to re-center your view is a useful thing in VR. It's
            // good practice to provide your users with a simple way to do so.
            VRSamplesUtil.addButton("Reset Pose", "R", null, function () { vrDisplay.resetPose(); });
          } else {
            VRSamplesUtil.addInfo("WebVR supported, but no VRDisplays found.", 3000);
          }
        });
      } else if (navigator.getVRDevices) {
        VRSamplesUtil.addError("Your browser supports WebVR but not the latest version. See <a href='http://webvr.info'>webvr.info</a> for more info.");
      } else {
        VRSamplesUtil.addError("Your browser does not support WebVR. See <a href='http://webvr.info'>webvr.info</a> for assistance.");
      }

	this.tojo = tojo;
	this.tojo.SetupScene();
    this.tojo.AnimateScene();
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