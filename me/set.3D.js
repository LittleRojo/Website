function Set() {
	
}

Set.prototype.Stage = function(canvas, tojo) {
	
	this.mainCanvas = canvas;
	this.renderer = new THREE.WebGLRenderer({ canvas:this.mainCanvas, antilias: true, alpha: true, clearAlpha: 1});
	this.renderer.setPixelRatio( window.devicePixelRatio );
	if(("standalone" in window.navigator) && window.navigator.standalone) {
		this.renderer.setSize( window.innerWidth, window.innerHeight - 82 );
	}
	else {
		this.renderer.setSize( window.innerWidth, window.innerHeight - 64 );
	}
	this.renderer.setClearColor( 0x000000, 1 );
	this.renderer.shadowMap.enabled = true;
	this.renderer.shadowMap.type = THREE.PCFShadowMap;
	this.renderer.shadowMapBias = 0.0039;
	this.renderer.shadowMapDarkness = 0.5;

	this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / (window.innerHeight), 1, 10000000 );	
	this.camera.position.set(0, 0, 0);
	this.camera.up = new THREE.Vector3(0,0,1);
	this.camera.destination = new THREE.Vector3(0,0,0);
	this.camera.origin = new THREE.Vector3(0, 0, 0);
	this.camera.rotation.order = 'YXZ'
	
	this.mouse = new THREE.TrackballControls( this.camera );
	this.mouse.rotateSpeed = 3;
	this.mouse.zoomSpeed = 1.2;
	this.mouse.panSpeed = 0.8;
	this.mouse.noZoom = false;
	this.mouse.noPan = false;
	this.mouse.noRotate = false;
	this.mouse.staticMoving = false;
	this.mouse.dynamicDampingFactor = 0.9;
	this.mouse.target = new THREE.Vector3(0, 0, 0);
	this.mouse.addEventListener( 'change', this.UpdateScene );
	
	this.audio = new Audio('media/nightnight.m4a');
	this.audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
	this.audiostate = 0;

	this.tojo = tojo;
	this.tojo.SetupScene();
}

Set.prototype.UpdateScene = function () {
 	var id = App.renderer.render(App.tojo.scene, App.camera);
 }

 Set.prototype.CanceScene = function () {
 	cancelAnimationFrame(id);
 }