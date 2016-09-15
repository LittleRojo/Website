function SceneTemplate(canvas) {
	this.renderer = new THREE.WebGLRenderer({ canvas:canvas, antilias: true, alpha: true, clearAlpha: 1});	;
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	this.renderer.shadowMap.enabled = true;
	this.renderer.shadowMap.type = THREE.PCFShadowMap;

	this.camera = new THREE.PerspectiveCamera( 90, window.innerWidth / (window.innerHeight), 1, 10000 );	
	this.camera.position.set( 40, 100, 1010 );
	this.camera.lookAt(new THREE.Vector3(0, 0, 0));

	//this.camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -1000, 1000 );
	//this.camera.position.set( 20, 120, 992 );
	//this.camera.lookAt(new THREE.Vector3(0, 0, 0));

	this.scene = new THREE.Scene();

	this.raycaster = new THREE.Raycaster();
	
	//this.keyboard = new THREEx.KeyboardState();
	
	this.mouse = new THREE.TrackballControls( this.camera );
	//this.mouse.rotateSpeed = 3;
	//this.mouse.zoomSpeed = 1.2;
	//this.mouse.panSpeed = 0.8;
	//this.mouse.noZoom = false;
	//this.mouse.noPan = false;
	//this.mouse.staticMoving = true;
	//this.mouse.dynamicDampingFactor = 0.3;
	//this.mouse.addEventListener( 'change', this.UpdateScene );

	this.projector = new THREE.Projector();
}

SceneTemplate.prototype.SetupScene = function() {

}

SceneTemplate.prototype.RedrawScene = function() {
	this.RedrawSceneFrame();
	this.UpdateSceneCamera();
	this.UpdateSceneLighting();
	this.UpdateUserInput();
	this.renderer.render( this.scene, this.camera );
}

SceneTemplate.prototype.RedrawSceneFrame = function() {
		
}
  
SceneTemplate.prototype.UpdateSceneCamera = function() {
	
}

SceneTemplate.prototype.UpdateSceneLighting = function() {
	
}

//USER EVENTS
SceneTemplate.prototype.UpdateUserInput = function() {
	this.UpdateUserKeyboard();
	this.UpdateUserMouse();
}

SceneTemplate.prototype.UpdateUserKeyboard = function() {
	//this.keyboard.update();	
}

SceneTemplate.prototype.UpdateUserMouse = function() {
	this.mouse.update();
}

//ANIMATION
SceneTemplate.prototype.AnimateScene = function(fps = 60) {
	this.stopScene = false;
	setTimeout(function() {
		if(this.stopScene) return;
		this.RedrawScene();		
	}, 1000);
}

SceneTemplate.prototype.StopAnimation = function() {
	this.stopScene = true;
}