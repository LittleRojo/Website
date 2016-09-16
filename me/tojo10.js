function tojo10() {
	this.name = "tojo10";
	this.fps = 0;
	this.sampleSize = 5;
	this.renderLengthQueue = [];
	this.previousRenderStamp;

	this.particleCount = 100;
	this.particles = new THREE.Geometry();
	this.scene = new THREE.Scene();
}

tojo10.prototype.SetupScene = function() {
	var material = new THREE.ParticleBasicMaterial({
			color:0xFFFFFF,
			size: 20
		});
	for(var a = 0; a < this.particleCount; a++) {
		var pX = Math.random() * 500,
			pY = Math.random() * 500,
			pZ = Math.random() * 500,
			particle = new THREE.Vertex(
				new THREE.Vector3(pX, pY, pZ)
			);			
		particle.velocity = new THREE.Vector3(0, -Math.random(), 0);
		this.particles.vertices.push(particle);
	}
	this.particleSystem = new THREE.ParticleSystem(this.particles, material);
	this.particleSystem.sortParticles = true;
	this.scene.add(this.particleSystem);
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
	this.particleSystem.rotation.y += 0.1;
	var pCount = this.particleCount;
	while(pCount--){
		var particle = this.particles.vertices[pCount];
		if(particle.position.y < -200){
			particle.position.y = 200;
			particle.velocity = 0;
		}
		particle.velocity.y -= Math.random() * 0.1;
		particle.position.addSelf(particle.velocity);
	}
	this.particleSystem.geometry.__dirtyVertices = true;
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