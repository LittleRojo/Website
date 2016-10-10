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

	//this.projector = new THREE.Projector();
	//this.raycaster = new THREE.Raycaster();

	this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / (window.innerHeight), 1, 50000 );	
	this.camera.position.set(0, 0, 20);
	//this.camera.up = new THREE.Vector3(0,0,1);
	//this.camera.lookAt(new THREE.Vector3(0,0,0));
	this.camera.destination = new THREE.Vector3(0,0,0);
	this.camera.origin = new THREE.Vector3(0,0,0);

	//window.camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -1000, 1000 );
	//window.camera.position.set( 20, 120, 992 );
	//window.camera.lookAt(new THREE.Vector3(0, 0, 0));

	//window.keyboard = new THREEx.KeyboardState();
	
	/*this.mouse = new THREE.TrackballControls( this.camera );
    this.mouse.rotateSpeed = 1.0;
    this.mouse.zoomSpeed = 1.2;
    this.mouse.panSpeed = 0.8;
    this.mouse.noZoom = false;
    this.mouse.noPan = false;
    this.mouse.staticMoving = true;
    this.mouse.dynamicDampingFactor = 0.15;*/
    
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