function Set() {
	
}

Set.prototype.Stage = function(canvas) {
		
	this.mainCanvas = canvas;
	this.renderer = new THREE.WebGLRenderer({ canvas:this.mainCanvas, antilias: true, alpha: true, clearAlpha: 1});	;
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	this.renderer.setClearColor( 0x000000, 1 );
	//this.renderer.shadowMap.enabled = true;
	//this.renderer.shadowMap.type = THREE.PCFShadowMap;

	//this.projector = new THREE.Projector();
	//this.raycaster = new THREE.Raycaster();

	this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / (window.innerHeight), .1, 100 );	
	this.camera.position.x = 0;
	this.camera.position.y = 0;
	this.camera.position.z = -100;
	this.camera.lookAt(new THREE.Vector3(0, 0, 0));

	//window.camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -1000, 1000 );
	//window.camera.position.set( 20, 120, 992 );
	//window.camera.lookAt(new THREE.Vector3(0, 0, 0));

	//window.keyboard = new THREEx.KeyboardState();
	
	//App.mouse = new THREE.TrackballControls( window.camera );
	//window.mouse.rotateSpeed = 3;
	//window.mouse.zoomSpeed = 1.2;
	//window.mouse.panSpeed = 0.8;
	//window.mouse.noZoom = false;
	//window.mouse.noPan = false;
	//window.mouse.staticMoving = true;
	//window.mouse.dynamicDampingFactor = 0.3;
	//window.mouse.addEventListener( 'change', this.UpdateScene );
}

Set.prototype.AddScene = function (sceneObj) {	
	this.scene = sceneObj;
	sceneObj.SetupScene();
}

Set.prototype.AnimateScene = function (sceneObj, fps) {
	sceneObj.AnimateScene(fps);
}