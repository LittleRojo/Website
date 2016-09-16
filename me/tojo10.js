function tojo10() {
	this.name = "tojo10";
	this.fps = 0;
	this.sampleSize = 5;
	this.renderLengthQueue = [];
	this.previousRenderStamp;

	this.layerCount = 10;
	this.particleCount = 1;	
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
				size: 10,
				//map: THREE.ImageUtils.loadTexture("archive/07-26-2016/apple-icon.png"),
				//map: THREE.ImageUtils.loadTexture("daddy.png"),
				//map: THREE.ImageUtils.loadTexture("Lawson.png"),
				blending: THREE.AdditiveBlending,
				transparent: true,
		});
		if(b % 4 == 0) material.map = THREE.ImageUtils.loadTexture("archive/07-26-2016/apple-icon.png");
 		else if(b % 4 == 1) material.map = THREE.ImageUtils.loadTexture("Momma.png");
		else if(b % 4 == 2)material.map = THREE.ImageUtils.loadTexture("Daddy.png");
		else material.map = THREE.ImageUtils.loadTexture("Lawson.png");
		for(var a = 0; a < this.particleCount; a++) {
			var pX = Math.random() * 20 - 10;
			var	pY = Math.random() * 20 - 10;
			var	pZ = 0; //Math.random() * 20 - 10;
			var	particle = new THREE.Vector3(pX, pY, pZ);
			particle.speedX = Math.random() / 50;
			particle.speedY = Math.random() / 50;
			particle.speedZ = Math.random() / 50;			
			
			if(Math.random() % 2 == 0) {
				particle.xDirection = 1;
			}
			else {
				particle.xDirection = -1;
			}
			if(Math.random() % 2 == 0) {
				particle.yDirection = 1;
			}
			else {
				particle.yDirection = -1;
			}
			if(Math.random() % 2 == 0) {
				particle.zDirection = 1;
			}
			else {
				particle.zDirection = -1;
			}		
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
	//this.CalculateFPS();
}

tojo10.prototype.RedrawSceneFrame = function() {	
	for(var a = 0; a < this.layers.length; a++) {
		/*if(a % 2 == 0) {
			this.particleSystems[a].rotation.z += a / 10000;
		}
		else {
			this.particleSystems[a].rotation.z -= a / 10000;
		}*/
		for(var b = 0; b < this.layers[a].vertices.length; b++) {
			var particle = this.layers[a].vertices[b];
			particle.x += (particle.speedX * particle.xDirection);
			particle.y += (particle.speedY * particle.yDirection);
			//particle.z = particle.z + (this.speedY * particle.zDirection);			
			particle.set( particle.x, particle.y, particle.z );

			if(particle.x > 10) {
				var angle = Math.PI * Math.random();
				var axis = new THREE.Vector3( 1, 0, 0 );
				//if(date.getMilliseconds() % 2 == 0) {
					//particle.applyAxisAngle(axis, angle)		
				//}
				particle.xDirection = -1;
			}
			else if(particle.x < -10) {
				var angle = Math.PI * Math.random() / 1000;
				var axis = new THREE.Vector3( 1, 0, 0 );
				//if(date.getMilliseconds() % 2 == 0) {
					//particle.applyAxisAngle(axis, angle)		
				//}
				particle.xDirection = 1;
			}
			if(particle.y > 10) {
				var angle = Math.PI * Math.random() / 1000;
				var axis = new THREE.Vector3( 0, 1, 0 );
				//if(date.getMilliseconds() % 2 == 0) {
				//	particle.applyAxisAngle(axis, angle)		
				//}
				particle.yDirection = -1;
			}
			else if(particle.y < -10) {
				var angle = Math.PI * Math.random() / 1000;
				var axis = new THREE.Vector3( 0, 1, 0 );
				//if(date.getMilliseconds() % 2 == 0) {
					//particle.applyAxisAngle(axis, angle)		
				//}
				particle.yDirection = 1;
			}
			if(particle.z > 10) {
				var angle = Math.PI * Math.random();
				var axis = new THREE.Vector3( 0, 0, 1 );
				//if(date.getMilliseconds() % 2 == 0) {
					//particle.applyAxisAngle(axis, angle)		
				//}
				particle.zDirection = -1;
			}
			else if(particle.z < -10) {
				var angle = Math.PI * Math.random();
				var axis = new THREE.Vector3( 0, 0, 1 );
				//if(date.getMilliseconds() % 2 == 0) {
					//particle.applyAxisAngle(axis, angle)		
				//}
				particle.zDirection = 1;
			}
		}
		this.particleSystems[a].geometry.___dirtyVertices = true;
		this.particleSystems[a].geometry.verticesNeedUpdate = true;
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