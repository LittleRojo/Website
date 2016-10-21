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
	this.camera.position.set(-1, -1, 5);

	this.orbitControls = new THREE.OrbitControls(this.camera);
	this.orbitControls.zoomSpeed = .1;
	this.orbitControls.rotateSpeed = .001;
	this.orbitControls.keyPanSpeed = .001;
	
	this.fakeCamera = new THREE.Object3D();
	this.vrControls = new THREE.VRControls(this.fakeCamera);
	this.effect = new THREE.VREffect( this.renderer );

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