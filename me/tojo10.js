function tojo10() {
	this.name = "tojo10";
	this.fps = 0;
	this.sampleSize = 5;
	this.renderLengthQueue = [];
	this.previousRenderStamp;

	this.layerCount = 10;
	this.particleCount = 1000;	
	this.layers = [];
	this.particleSystems = [];
	this.scene = new THREE.Scene();
}

tojo10.prototype.SetupScene = function() {
	for(var b = 0; b < this.layerCount; b++ ) {
		layer = new THREE.Geometry();
		this.layers.push(layer);
		var material = new THREE.PointsMaterial({
				color: "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")",
				size: 1,
				//map: THREE.ImageUtils.loadTexture("logo.png"),
				blending: THREE.AdditiveBlending,
				transparent: true,
		});
		var a = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")"
		for(var a = 0; a < this.particleCount; a++) {
			var pX = Math.random() * 200 - 100;
			var	pY = Math.random() * 150 - 75;
			var	pZ = Math.random() * 500 - 250;
			var	particle = new THREE.Vector3(pX, pY, pZ);
			//this.particles.faces.push(new THREE.Face3(0, 1, 2));	
			//this.particles.faces[0].vertexColors.push(new THREE.Color(Math.random(), Math.random(), Math.random()));				
			//particle.velocity = new THREE.Vector3(0, -Math.random(), 0);
			layer.vertices.push(particle);
		}
		var particleSystem = new THREE.Points(layer, material);
		this.particleSystems.push(particleSystem);
		this.scene.add(particleSystem);
	}
	App.renderer.render( this.scene, App.camera );
}

tojo10.prototype.RedrawScene = function() {
	this.RedrawSceneFrame();
	this.UpdateSceneCamera();
	this.UpdateSceneLighting();
	this.UpdateUserInput();
	App.renderer.render( this.scene, App.camera );
	this.CalculateFPS();
}

tojo10.prototype.RedrawSceneFrame = function() {		
	for(var a = 0; a < this.layers.length; a++) {
		if(a % 2 == 0) {
			this.particleSystems[a].rotation.z += a / 1000;
		}
		else {
			this.particleSystems[a].rotation.z -= a / 1000;
		}
		for(var b = 0; b < this.layers[a].vertices.length; b++) {
			var particle = this.layers[a].vertices[b];
			if(particle.z < -150){
				particle.z = 150;
				//particle.velocity = 0;
			}
			//particle.velocity.y -= Math.random() * 0.1;
			//particle.position.addSelf(particle.velocity);
		}
		this.particleSystems[a].geometry.___dirtyVertices = true;
	}
	App.renderer.render(this.scene, App.camera);
}
  
tojo10.prototype.UpdateSceneCamera = function() {
	
}

tojo10.prototype.UpdateSceneLighting = function() {
	
}

//USER EVENTS
tojo10.prototype.UpdateUserInput = function() {
	this.UpdateUserKeyboard();
	this.UpdateUserMouse();
}

tojo10.prototype.UpdateUserKeyboard = function() {
	//this.keyboard.update();	
}

tojo10.prototype.UpdateUserMouse = function() {
	//this.mouse.update();
}

//ANIMATION
var stopScene = false;
tojo10.prototype.AnimateScene = function(fps) {
	if(App.scene.stopScene) {
		startScene = false;
		return;
	}
	App.scene.RedrawScene();
	requestAnimationFrame(App.scene.AnimateScene);
}

tojo10.prototype.StopAnimation = function() {
	stopScene = true;
}


tojo10.prototype.CalculateFPS = function() {
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