function tojo11() {
	this.name = "tojo11";
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

tojo11.prototype.SetupScene = function() {

    //LIGHT
    hemiLight();
    directionalLight();
    spotLight();
    
    //WORLD
    ground();    
    stars();
    clouds();
    sky();

    //capSpire
    this.all = new THREE.Group();
    capSpireLogo();
    //capSpireName();
    
          
    App.tojo.scene.add(App.tojo.all);
    
    App.mouse.target = new THREE.Vector3( 0, 13.1,0 );
    App.tojo.logoTween = new TWEEN.Tween(App.tojo.logoGroup.position);
            
    App.tojo.logoTween.onComplete(function () {
        App.tojo.logoState = 0;
    });
}

tojo11.prototype.RedrawScene = function() {
	this.RedrawSceneFrame();
	this.UpdateSceneCamera();
	this.UpdateSceneLighting();
	this.UpdateUserInput();

    App.renderer.render( this.scene, App.camera );
    //App.effect.render( this.scene, App.camera )
}

var counter = 0;
tojo11.prototype.RedrawSceneFrame = function() {

}
  
var skip = 1;
var size = 20;
tojo11.prototype.UpdateSceneCamera = function() {
    if(App.tojo.cameraState == 10) {
        App.tween.to( { x: rand(-size,size), y: rand(5,size/2), z : rand(-size,size) }, rand(500, size * 50));
        App.tween.start();
        App.tween.easing(TWEEN.Easing.Exponential.In)
        App.tojo.cameraState = 1;        
    }
    if(App.tojo.logoState == 0)
    {
        App.tojo.logoTween.to( { x: rand(-size,size), y: rand(5,size/2), z : rand(-size,size) }, rand(1000, size * 50));
        App.tojo.logoTween.start();
        //App.tojo.logoTween.easing(TWEEN.Easing.Sinusoidal.Out);
        App.tojo.logoState = 1;
        size += 10;
    }
    App.mouse.target = App.tojo.logoGroup.position;
}

tojo11.prototype.UpdateSceneLighting = function() {
	
}

//USER EVENTS
tojo11.prototype.UpdateUserInput = function() {
	this.UpdateUserKeyboard();
	this.UpdateUserMouse();
}

tojo11.prototype.UpdateUserKeyboard = function() {
	//this.keyboard.update();	
}

tojo11.prototype.UpdateUserMouse = function() {
    App.mouse.update();
	//App.controls.update();
}

//ANIMATION
var stopScene = false;
tojo11.prototype.AnimateScene = function(delta) {
    if(stopScene) {
        startScene = false;
        return;
    }
    App.tojo.RedrawScene();

    if(App.vrDisplay === undefined) {
        requestAnimationFrame(App.tojo.AnimateScene);
    }
    else {    
	    App.vrDisplay.requestAnimationFrame(App.tojo.AnimateScene);
    }

    TWEEN.update(delta);
}

tojo11.prototype.StopAnimation = function() {
	stopScene = true;
}