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

	this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / (window.innerHeight), 1, 1000000 );	
	this.camera.position.set(490, 420, 180);
	this.camera.up = new THREE.Vector3(0,0,1);
	this.camera.lookAt(new THREE.Vector3(0,0,0));
	this.camera.destination = new THREE.Vector3(0,0,0);
	this.camera.origin = new THREE.Vector3(490,420,180);

	//window.camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -1000, 1000 );
	//window.camera.position.set( 20, 120, 992 );
	//window.camera.lookAt(new THREE.Vector3(0, 0, 0));

	//window.keyboard = new THREEx.KeyboardState();
	
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

Set.prototype.AnimateScene = function () {
	//this.tojo.SetupScene();
	//this.tojo.AnimateScene();
}

Set.prototype.AddWorld = function () {
	var geometry = new THREE.PlaneGeometry( 10000, 10000, 1, 1 );
	var planeMaterial = new THREE.MeshLambertMaterial( { color: 0x00ff00, side: THREE.DoubleSide } );
	var ground = new THREE.Mesh( geometry, planeMaterial );
	ground.position.z = -10;
	ground.receiveShadow = true;
	ground.shading = THREE.FlatShading;
	this.tojo.scene.add( ground );

	var light = new THREE.SpotLight(0xff0000);
	light.intensity = 5;
	//light.shadowDarkness = 100;
	light.castShadow = true;
	//light.target.position.set( 0, 0, 0 );
	//light.shadow.camera.near = true;
	//light.position.set(-70, -100, 90);
	light.position.set(-0, -0, 10);
	this.tojo.scene.add(light);	

	this.renderer.render(this.tojo.scene, this.camera);
}

Set.prototype.UpdateScene = function () {
 	App.renderer.render(App.tojo.scene, App.camera);
 }