function tojo12() {
	this.name = "tojo12";
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

tojo12.prototype.SetupScene = function() {

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
    carpet();
    desk();
        
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

tojo12.prototype.RedrawScene = function() {
	this.RedrawSceneFrame();
	this.UpdateSceneCamera();
	this.UpdateSceneLighting();
	this.UpdateUserInput();

    //App.renderer.render( this.scene, App.camera );
    App.effect.render( this.scene, App.camera )

    App.camera.position.copy(App.tojo.orbitPos);
}

var counter = 0;
var size = 100;
tojo12.prototype.RedrawSceneFrame = function() {

    if(App.tojo.logoState == 10)
    {
        App.tojo.logoTween.to( { x: rand(-size,size), y: rand(5,size/2), z : rand(-size,size) }, rand(4000, 7000));
        App.tojo.logoTween.start();
        //  App.tojo.logoTween.easing(TWEEN.Easing.Sinusoidal.Out);
        App.tojo.logoState = 1;
        //  size += 10;
    }
}
  
var skip = 1;
tojo12.prototype.UpdateSceneCamera = function() {

    if(App.tojo.cameraState == 10) {
        App.tween.to( { x: rand(-size,size), y: rand(5,size/2), z : rand(-size,size) }, rand(4000,7000));
        App.tween.start();
        App.tween.easing(TWEEN.Easing.Exponential.In)
        App.tojo.cameraState = 1;        
    }    
}

tojo12.prototype.UpdateSceneLighting = function() {
	
}

//USER EVENTS
tojo12.prototype.UpdateUserInput = function() {
	this.UpdateUserKeyboard();
	this.UpdateUserMouse();
}

tojo12.prototype.UpdateUserKeyboard = function() {
	//this.keyboard.update();	
}

tojo12.prototype.UpdateUserMouse = function() {
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