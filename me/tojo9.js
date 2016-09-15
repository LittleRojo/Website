if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}

function tojo9(fps) {
	this.name = "tojo9";
	this.fpsWant = fps;
	this.fps = 0;
	this.sampleSize = 5;
	this.renderLengthQueue = [];
	this.previousRenderStamp;
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
	//this.CalculateFPS();
}

var direction = 1;
tojo9.prototype.RedrawSceneFrame = function() {
	this.scene.children.forEach(function (mesh) {
		if(mesh.position.x > 300){
			direction = 0;
		}
		if(mesh.position.x < -300) {
			direction = 1;
		}
		if(direction == 1) {
			mesh.position.x += 10;
		}
		else {
			mesh.position.x -= 10;
		}
	});
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