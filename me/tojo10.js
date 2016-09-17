function tojo10() {
	this.name = "tojo10";
	this.radius = 20;

	this.fps = 0;
	this.sampleSize = 5;
	this.renderLengthQueue = [];
	this.previousRenderStamp;

	this.layerCount = 1;
	this.particleCount = 100000;	
	this.layers = [];
	this.particleSystems = [];
	this.scene = new THREE.Scene();
}

tojo10.prototype.SetupScene = function() {
	for(var b = 0; b < this.layerCount; b++ ) {
		var layer = new THREE.BufferGeometry();
		this.layers.push(layer);

		var positions = new Float32Array( this.particleCount * 3 );
		var colors = new Float32Array( this.particleCount * 3 );
		var sizes = new Float32Array( this.particleCount );
		var color = new THREE.Color();
		for(var a = 0; a < this.particleCount; a++) {

			var r = Math.random() * 255;
			var g = Math.random() * 255;
			var b = Math.random() * 255;

			color.setRGB(Math.random(),Math.random(),Math.random());
			colors[ 3 * a + 0 ] = color.r;
			colors[ 3 * a + 1 ] = color.g;
			colors[ 3 * a + 2 ] = color.b;

			positions[ 3 * a + 0 ] = Math.random() * 200 - 100;
			positions[ 3 * a + 1 ] = Math.random() * 100 - 50;
			positions[ 3 * a + 2 ] = 0;//( Math.random() * 2 - 1 ) * this.radius;

			sizes[ a ] = 10;
		}

		var uniforms = {
			color:     { value: new THREE.Color( 0xffffff ) },
			texture:   { value: new THREE.TextureLoader().load( "spark1.png" ) }
		};

		var material = new THREE.ShaderMaterial( 
		{
			uniforms:       uniforms,
			vertexShader:   document.getElementById( 'vertexshader' ).textContent,
			fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

			//blending:       THREE.AdditiveBlending,
			depthTest:      false,
			transparent:    true
		});

		layer.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
		layer.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
		layer.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
		
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
		var position = this.particleSystems[a].geometry.attributes.position.array;
		for ( var i = 0; i < this.particleCount; i++ ) {
			//position[ 3 * i + 0 ] += i * .000001;
			//position[ 3 * i + 1 ] += i * .0001;//( Math.random() * 8 - 1 ) * this.radius;
			//position[ 3 * i + 2 ] += 0;//( Math.random() * 2 - 1 ) * this.radius;
		}
		this.particleSystems[a].geometry.attributes.position.needsUpdate = true;
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