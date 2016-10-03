function tojo11() {
	this.name = "tojo11";
	this.fps = 0;
	this.sampleSize = 5;
	this.renderLengthQueue = [];
	this.previousRenderStamp;
	this.scene = new THREE.Scene();
}

tojo11.prototype.SetupScene = function() {
	var geometry = new THREE.CylinderGeometry( 0, 3, 8, 1000 );
    var material = new THREE.MeshPhongMaterial( {color: 0xffff00} );
    var cylinder = new THREE.Mesh( geometry, material );
    var axis = new THREE.Vector3(0.5,0.5,0);   
    cylinder.rotation.x = deg(140); 
    this.scene.add( cylinder );

    var lights = [];
    lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

    lights[ 0 ].position.set( 0, 200, 0 );
    lights[ 1 ].position.set( 100, 200, 100 );
    lights[ 2 ].position.set( - 100, - 200, - 100 );

    this.scene.add( lights[ 0 ] );
    this.scene.add( lights[ 1 ] );
    this.scene.add( lights[ 2 ] );

	App.renderer.render( this.scene, App.camera );
}

tojo11.prototype.RedrawScene = function() {
	this.RedrawSceneFrame();
	this.UpdateSceneCamera();
	this.UpdateSceneLighting();
	this.UpdateUserInput();
	App.renderer.render( this.scene, App.camera );
}

tojo11.prototype.RedrawSceneFrame = function() {

}
  
tojo11.prototype.UpdateSceneCamera = function() {
	
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
}

//ANIMATION
var stopScene = false;
tojo11.prototype.AnimateScene = function(fps) {
    if(stopScene) {
		startScene = false;
		return;
	}
	App.tojo.RedrawScene();
	requestAnimationFrame(App.tojo.AnimateScene);
}

tojo11.prototype.StopAnimation = function() {
	stopScene = true;
}


tojo11.prototype.CalculateFPS = function() {
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

function deg(degree)   { return degree*(Math.PI/180); }