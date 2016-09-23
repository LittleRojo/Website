function Set() {
	
}

Set.prototype.Stage = function(canvas, tojo) {
	
	this.mainCanvas = canvas;
	this.renderer = new THREE.WebGLRenderer({ canvas:this.mainCanvas, antilias: true, alpha: true, clearAlpha: 1});
	this.renderer.setPixelRatio( window.devicePixelRatio );
	if(("standalone" in window.navigator) && window.navigator.standalone) {
		//IPHONE ORIENTATION - PROFILE
		if(window.orientation === 90 || window.orientation === -90) {
			this.renderer.setSize( window.innerWidth, window.innerHeight - 86 );
		}
		//IPHONE ORIENTATION - LANDSCAPE
		else {
			this.renderer.setSize( window.innerWidth, window.innerHeight - 65 );
		}
	}
	else {
		this.renderer.setSize( window.innerWidth, window.innerHeight - 65 );
	}
	this.renderer.setClearColor( 0x000000, 1 );
	this.renderer.shadowMap.enabled = true;
	this.renderer.shadowMap.type = THREE.PCFShadowMap;
	this.renderer.shadowMapBias = 0.0039;
	this.renderer.shadowMapDarkness = 0.5;

	this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / (window.innerHeight), 1, 1000000 );	
	this.camera.position.set(15000, 15000, 4500);
	this.camera.up = new THREE.Vector3(0,0,1);
	this.camera.lookAt(new THREE.Vector3(0,0,0));
	this.camera.destination = new THREE.Vector3(0,0,0);
	this.camera.origin = new THREE.Vector3(15000, 15000, 4500);

	this.mouse = new THREE.TrackballControls( this.camera );
	this.mouse.rotateSpeed = 3;
	this.mouse.zoomSpeed = 1.2;
	this.mouse.panSpeed = 0.8;
	this.mouse.noZoom = false;
	this.mouse.noPan = false;
	this.mouse.staticMoving = true;
	this.mouse.dynamicDampingFactor = 0.3;
	this.mouse.addEventListener( 'change', this.UpdateScene );

	this.tojo = tojo;
	this.tojo.SetupScene();
}

Set.prototype.UpdateScene = function () {
 	var id = App.renderer.render(App.tojo.scene, App.camera);
 }

 Set.prototype.AlterVideo = function () {
 	cancelAnimationFrame(id);
 }