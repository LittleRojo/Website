function tojo12() {
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
}

tojo12.prototype.SetupScene = function() {
    this.logoGroup = new THREE.Group();
    this.all = new THREE.Group();

    hemiLight();
    directionalLight();
    spotLight();
    carpet();
    desk();
        
    App.camera.position.set(-6, 1.4, -1);
    App.tojo.scene.rotation.x = -Math.PI/2;
    App.tojo.scene.add(App.tojo.all);
}

tojo12.prototype.RedrawScene = function() {
	this.RedrawSceneFrame();
	this.UpdateSceneCamera();
	this.UpdateSceneLighting();
	this.UpdateUserInput();

    App.effect.render( this.scene, App.camera )

    App.camera.position.copy(App.tojo.orbitPos);
}

tojo12.prototype.RedrawSceneFrame = function() {
}
  
tojo12.prototype.UpdateSceneCamera = function() {   
}

tojo12.prototype.UpdateSceneLighting = function() {	
}

//USER EVENTS
tojo12.prototype.UpdateUserInput = function() {
	this.UpdateUserKeyboard();
	this.UpdateUserMouse();
}

tojo12.prototype.UpdateUserKeyboard = function() {	
}

tojo12.prototype.UpdateUserMouse = function() {
	App.orbitControls.update();
    App.vrControls.update();

    this.orbitPos = App.camera.position.clone();
    
    // Apply the VR HMD camera position and rotation
    // on top of the orbited camera.
    var rotatedPosition = App.fakeCamera.position.applyQuaternion( App.camera.quaternion );
    App.camera.position.add(rotatedPosition);
    App.camera.quaternion.multiply(App.fakeCamera.quaternion);    
}

//ANIMATION
var stopScene = false;
tojo12.prototype.AnimateScene = function(delta) {
    if(stopScene) {
        startScene = false;
        return;
    }
    App.tojo.RedrawScene();
    App.effect.requestAnimationFrame( App.tojo.AnimateScene );
    //TWEEN.update(delta);
}

tojo12.prototype.StopAnimation = function() {
	stopScene = true;
}