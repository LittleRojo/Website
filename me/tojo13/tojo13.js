function tojo13() {
	this.name = "tojo13";
	this.fps = 0;
	this.sampleSize = 5;
	this.renderLengthQueue = [];
	this.previousRenderStamp;
	this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.cameraState = 0;
    this.logoState = 0;
    this.logoTween;
}

tojo13.prototype.SetupScene = function() {

    this.logoGroup = new THREE.Group();
    this.all = new THREE.Group();

    //LIGHT
    hemiLight();
    directionalLight();
    spotLight();
    
    //WORLD
    //ground();    
    //stars();
    //sun();
    //clouds();
    //sky();

    //capSpire    
    //capSpireLogo();
    //capSpireName();
    //carpet();
    //desk();
        
    App.camera.position.set(-6, 1.4, -1);
    App.tojo.scene.rotation.x = -Math.PI/2;
    App.tojo.scene.add(App.tojo.all);
    
    //App.tojo.scene.add(App.camera);
    //App.orbitControls.target = new THREE.Vector3( 0, -.1,0 );
    //App.tojo.logoTween = new TWEEN.Tween(App.tojo.logoGroup.position);
            
    //App.tojo.logoTween.onComplete(function () {
     //   App.tojo.logoState = 0;
    //});
}

tojo13.prototype.RedrawScene = function() {
	this.RedrawSceneFrame();
	this.UpdateSceneCamera();
	this.UpdateSceneLighting();
	this.UpdateUserInput();

    //App.renderer.render( this.scene, App.camera );
    App.effect.render( this.scene, App.camera )

    App.camera.position.copy(App.tojo.orbitPos);
}

tojo13.prototype.RedrawSceneFrame = function() {

}
  
tojo13.prototype.UpdateSceneCamera = function() {
   
}

tojo13.prototype.UpdateSceneLighting = function() {
	
}

//USER EVENTS
tojo13.prototype.UpdateUserInput = function() {
	this.UpdateUserKeyboard();
	this.UpdateUserMouse();
}

tojo13.prototype.UpdateUserKeyboard = function() {
	//this.keyboard.update();	
}

tojo13.prototype.UpdateUserMouse = function() {
    //App.mouse.update();
	App.orbitControls.update();
    App.vrControls.update();

    this.orbitPos = App.camera.position.clone();
    
    // Apply the VR HMD camera position and rotation
    // on top of the orbited camera.
    var rotatedPosition = App.fakeCamera.position.applyQuaternion( App.camera.quaternion );
    App.camera.position.add(rotatedPosition);
    App.camera.quaternion.multiply(App.fakeCamera.quaternion);
    
    //console.log("Camera Position: (" + App.camera.position.x + ", " + App.camera.position.y + ", " + App.camera.position.z + ")")
    //console.log("Orbit Controls Up (: " + App.orbitControls.up.x + "." + App.orbitControls.up.y + "." + App.orbitControls.up.z)
    //console.log("Orbit Controls Normal (: " + App.orbitControls.normal.x + "." + App.orbitControls.normal.y + "." + App.orbitControls.normal.z)
    //console.log("Orbit Controls Target: (" + App.orbitControls.target.x + ", " + App.orbitControls.target.y + ", " + App.orbitControls.target.z + ")")
    //vrEffect.render(scene, camera);
    
    // Restore the orbit position, so that the OrbitControls can
    // pickup where it left off.
    
}

//ANIMATION
var stopScene = false;
tojo13.prototype.AnimateScene = function(delta) {
    if(stopScene) {
        startScene = false;
        return;
    }
    App.tojo.RedrawScene();
    App.effect.requestAnimationFrame( App.tojo.AnimateScene );
    //TWEEN.update(delta);
}

tojo13.prototype.StopAnimation = function() {
	stopScene = true;
}