function tojo9(canvas) {
	this.name = "tojo9";
	this.scene = new THREE.Scene();
}

tojo9.prototype.SetupScene = function() {
	var geometry = new THREE.CubeGeometry( 70, 70, 70);
	var material = new THREE.MeshBasicMaterial( { color: 0x0000ff, side: THREE.DoubleSide  } ); //BLUE
	var mesh = new THREE.Mesh( geometry, material );
	this.scene.add(mesh);	
	App.renderer.render( this.scene, App.camera );
}

tojo9.prototype.RedrawScene = function() {
	this.RedrawSceneFrame();
	this.UpdateSceneCamera();
	this.UpdateSceneLighting();
	this.UpdateUserInput();
	App.renderer.render( this.scene, App.camera );
}

tojo9.prototype.RedrawSceneFrame = function() {
	this.mesh["a"].translateX(50);
}
  
tojo9.prototype.UpdateSceneCamera = function() {
	
}

tojo9.prototype.UpdateSceneLighting = function() {
	
}

//USER EVENTS
tojo9.prototype.UpdateUserInput = function() {
	this.UpdateUserKeyboard();
	this.UpdateUserMouse();
}

tojo9.prototype.UpdateUserKeyboard = function() {
	//this.keyboard.update();	
}

tojo9.prototype.UpdateUserMouse = function() {
	this.mouse.update();
}

//ANIMATION
tojo9.prototype.AnimateScene = function(fps = 60) {
	this.stopScene = false;
	setTimeout(function() {
		if(App.scenes[0].stopScene) return;
		App.scenes[0].RedrawScene();		
	}, 1000);
}

tojo9.prototype.StopAnimation = function() {
	this.stopScene = true;
}