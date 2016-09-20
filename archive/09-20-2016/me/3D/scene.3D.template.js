function tojo9() {
	this.name = "tojo9";
	this.fps = 0;
	this.sampleSize = 5;
	this.renderLengthQueue = [];
	this.previousRenderStamp;
	this.scene = new THREE.Scene();
}

tojo9.prototype.SetupScene = function() {
	
	App.renderer.render( this.scene, App.camera );
}

tojo9.prototype.RedrawScene = function() {
	this.RedrawSceneFrame();
	this.UpdateSceneCamera();
	this.UpdateSceneLighting();
	this.UpdateUserInput();
	App.renderer.render( this.scene, App.camera );
	this.CalculateFPS();
}

tojo9.prototype.RedrawSceneFrame = function() {

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
	//this.mouse.update();
}

//ANIMATION
var stopScene = false;
tojo9.prototype.AnimateScene = function(fps) {
	if(App.scene.stopScene) {
		startScene = false;
		return;
	}
	App.scene.RedrawScene();
	requestAnimationFrame(App.scene.AnimateScene);
}

tojo9.prototype.StopAnimation = function() {
	stopScene = true;
}


tojo9.prototype.CalculateFPS = function() {
	if(this.previousRenderStamp == null) {
		this.previousRenderStamp = Date.now();
		return;
	}
	var time = Date.now() - this.previousRenderStamp;
	this.previousRenderStamp = Date.now();
	if(this.renderLengthQueue.length > 0) {
		this.renderLengthQueue.shift();
	}
	this.renderLengthQueue.push(time);
	var length = 0;
	this.renderLengthQueue.forEach(function(a) {
		length += a;
	});
	this.fps = (1000/(length / this.renderLengthQueue.length)) * this.renderLengthQueue.length;
}