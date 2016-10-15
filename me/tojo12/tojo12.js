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

    //LIGHT
    //hemiLight();
    //directionalLight();
    //spotLight();
    
    //WORLD
    ground();    
    stars();
    sun();
    //clouds();
    //sky();

    //capSpire
    this.all = new THREE.Group();
    capSpireLogo();
    //capSpireName();
    
          
    App.tojo.scene.add(App.tojo.all);
    
    //App.mouse.target = new THREE.Vector3( 0, 13.1,0 );
    App.tojo.logoTween = new TWEEN.Tween(App.tojo.logoGroup.position);
            
    App.tojo.logoTween.onComplete(function () {
        App.tojo.logoState = 0;
    });
}

tojo12.prototype.RedrawScene = function() {
	this.RedrawSceneFrame();
	this.UpdateSceneCamera();
	this.UpdateSceneLighting();
	this.UpdateUserInput();

    App.renderer.render( this.scene, App.camera );
    App.effect.render( this.scene, App.camera )
}

var counter = 0;
var size = 100;
tojo12.prototype.RedrawSceneFrame = function() {

    if(App.tojo.logoState == 0)
    {
        App.tojo.logoTween.to( { x: rand(-size,size), y: rand(5,size/2), z : rand(-size,size) }, rand(4000, 7000));
        App.tojo.logoTween.start();
        //App.tojo.logoTween.easing(TWEEN.Easing.Sinusoidal.Out);
        App.tojo.logoState = 1;
        //size += 10;
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
    App.mouse.target = App.tojo.logoGroup.position;
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
    App.mouse.update();
	App.controls.update();
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
    TWEEN.update(delta);
}

tojo12.prototype.StopAnimation = function() {
	stopScene = true;
}