function tojo10() {
	this.name = "tojo10";
	this.radius = 20;

	this.fps = 0;
	this.sampleSize = 5;
	this.renderLengthQueue = [];
	this.previousRenderStamp;

	this.layerCount = 1;
	this.particleCount = 1000;	
	this.layers = [];
	this.particleSystems = [];
	this.scene = new THREE.Scene();
}

tojo10.prototype.SetupScene = function() {
	for(var b = 0; b < this.layerCount; b++ ) {
		layer = new THREE.BufferGeometry();
		this.layers.push(layer);
		/*var material = new THREE.PointsMaterial({
				color: "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")",
				size: 1,
				//map: THREE.ImageUtils.loadTexture("archive/07-26-2016/apple-icon.png"),
				//map: THREE.ImageUtils.loadTexture("daddy.png"),
				//map: THREE.ImageUtils.loadTexture("Lawson.png"),
				blending: THREE.AdditiveBlending,
				transparent: true,
		});	*/
		var positions = new Float32Array( this.particleCount * 3 );
		var colors = new Float32Array( this.particleCount * 3 );
		var sizes = new Float32Array( this.particleCount );
		for(var a = 4; a < 4 + this.particleCount; a++) {
			var pX = Math.random() * 10 - 5;
			var	pY = Math.random() * 10 - 5;
			var	pZ = 0; //Math.random() * 20 - 10;
			var	particle = new THREE.Vector3(pX, pY, pZ);
			particle.speedX = Math.random() / 1;
			particle.speedY = Math.random() / 1;
			particle.speedZ = Math.random() / 1;			
			
			colors[ a + 0 ] = Math.floor(Math.random() * 255);
			colors[ a + 1 ] = Math.floor(Math.random() * 255);
			colors[ a + 2 ] = Math.floor(Math.random() * 255);

			positions[ a + 0 ] = ( Math.random() * 2 - 1 ) * this.radius;
			positions[ a + 1 ] = ( Math.random() * 2 - 1 ) * this.radius;
			positions[ a + 2 ] = ( Math.random() * 2 - 1 ) * this.radius;

			sizes[ a ] = 20;

			if(false){
				if(b % 4 == 0) {
					material.map = THREE.ImageUtils.loadTexture("archive/07-26-2016/apple-icon.png");
				}
				else if(b % 4 == 1) {
					material.map = THREE.ImageUtils.loadTexture("Momma.png");
				}
				else if(b % 4 == 2) {
					material.map = THREE.ImageUtils.loadTexture("Daddy.png");
				}
				else {
					material.map = THREE.ImageUtils.loadTexture("Lawson.png");
				}
			}

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
			//layer.vertices.push(particle);
		}

		var uniforms = {
				color:     { value: new THREE.Color( 0xffffff ) },
				texture:   { value: new THREE.TextureLoader().load( "logo.png" ) }
			};
		var material = new THREE.ShaderMaterial( 
		{
			uniforms:       uniforms,
			vertexShader:   document.getElementById( 'vertexshader' ).textContent,
			fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

			blending:       THREE.AdditiveBlending,
			depthTest:      false,
			transparent:    true
		});
		layer.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
		layer.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
		layer.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
			
		var particleSystem = new THREE.Points(layer, material);
		//particleSystem.dynamic = true;
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
		//this.particleSystems[a].rotation.z += (Math.random() * 2 - 1000) / 10000;
		/*if(Math.random() % 2 == 0) {
			this.particleSystems[a].rotation.z += a / 10000;
			if(Math.random() % 2 == 0) {
				this.particleSystems[a].rotation.y += a / 100;
			}
			else {
				this.particleSystems[a].rotation.y -= a / 100;
			}
		}
		else {
			this.particleSystems[a].rotation.z -= a / 10000;
			/*if(Math.random() % 2 == 0) {
				this.particleSystems[a].rotation.y += a / 10000;
			}
			else {
				this.particleSystems[a].rotation.y -= a / 10000;
			}
		}*/
		for(var b = 0; b < this.layers[a].vertices.length; b++) {
			var particle = this.layers[a].vertices[b];
			particle.x += (particle.speedX * particle.xDirection);
			particle.y += (particle.speedY * particle.yDirection);
			//particle.z = particle.z + (this.speedY * particle.zDirection);			
			particle.set( particle.x, particle.y, particle.z );

			var minX = 140;//window.innerWidth / 1028 * 10;
			if(particle.x > minX) {
				var angle = Math.PI * Math.random();
				var axis = new THREE.Vector3( 1, 0, 0 );
				//if(date.getMilliseconds() % 2 == 0) {
					//particle.applyAxisAngle(axis, angle)		
				//}
				particle.xDirection = -1;
			}
			else if(particle.x < -minX) {
				var angle = Math.PI * Math.random() / 1000;
				var axis = new THREE.Vector3( 1, 0, 0 );
				//if(date.getMilliseconds() % 2 == 0) {
					//particle.applyAxisAngle(axis, angle)		
				//}
				particle.xDirection = 1;
			}
			var minY = 90;
			if(particle.y > minY) {
				var angle = Math.PI * Math.random() / 1000;
				var axis = new THREE.Vector3( 0, 1, 0 );
				//if(date.getMilliseconds() % 2 == 0) {
				//	particle.applyAxisAngle(axis, angle)		
				//}
				particle.yDirection = -1;
			}
			else if(particle.y < -minY) {
				var angle = Math.PI * Math.random() / 1000;
				var axis = new THREE.Vector3( 0, 1, 0 );
				//if(date.getMilliseconds() % 2 == 0) {
					//particle.applyAxisAngle(axis, angle)		
				//}
				particle.yDirection = 1;
			}
			if(particle.z > 50) {
				var angle = Math.PI * Math.random();
				var axis = new THREE.Vector3( 0, 0, 1 );
				//if(date.getMilliseconds() % 2 == 0) {
					//particle.applyAxisAngle(axis, angle)		
				//}
				particle.zDirection = -1;
			}
			else if(particle.z < -50) {
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