function tojo10() {
	this.name = "tojo10";
	this.radius = 20;

	this.fps = 0;
	this.sampleSize = 5;
	this.renderLengthQueue = [];
	this.previousRenderStamp;
	
	this.layers = [];
	this.particleSystems = [];
	this.scene = new THREE.Scene();

	this.animationSpeed = .00386699 * 440;
	this.randomness = .5
}

var starStart=0;
tojo10.prototype.SetupScene = function() {
	
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	var img = new Image();
	img.onload = function(){
		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage(img,0,0);
		
		var layer = new THREE.Geometry();				
		layer.verticesNeedUpdate = true;
		layer.normalsNeedUpdate = true;
		layer.colorsNeedUpdate = true;
		layer.uvsNeedUpdate = true;	
		App.tojo.layers.push(layer);

		var stars = 1000;
		var counter = 0;
		var pixels = new Pixel({
			position: new Float32Array( img.width * img.height * 3 ),
			color: [],
			size: new Float32Array( img.width * img.height )
		});
		var width = img.width / 2;
		var height = img.height / 2;
		for(var x = 0; x < img.width; x++){
			if(x % 2 != 0) { continue; }
			for(var y = 0; y < img.height; y++) {				
				if(y % 2 != 0) { continue; }
				var pixel = ctx.getImageData(x, y, 1, 1);
				
				pixels.color[counter] = new THREE.Color("rgb(" + pixel.data[0] + "," + pixel.data[1] + "," + pixel.data[2] + ")");
				if(pixels.color[counter].r == 0 && pixels.color[counter].g == 0 && pixels.color[counter].b == 0){
					continue;
				}
				if(pixels.color[counter].r == 42 && pixels.color[counter].g == 126 && pixels.color[counter].b == 188){
					continue;
				}

				pixels.position[ 3 * counter ] = (x - width) * 1;
				pixels.position[ 3 * counter + 1 ] = ((img.height - y) - height) * 1;
				pixels.position[ 3 * counter+ 2 ] = 1;

				var s = Math.random() / 3 * 1000;
				var t = Math.random() / 3 * 1000;
				var cosS = Math.cos(s * (Math.PI / 180));
				var cosT = Math.cos(t * (Math.PI / 180));
				var sinS = Math.sin(s * (Math.PI / 180));
				var sinT = Math.sin(t * (Math.PI / 180));

				var spot = new THREE.Vector3(pixels.position[ 3 * counter ], pixels.position[ 3 * counter + 1 ], pixels.position[ 3 * counter + 2 ])				
				layer.vertices.push(spot)
				counter++;
			}
		}
		
		layer.colors = pixels.color;
		var material = new THREE.PointsMaterial( 
		{
			color: 0xffffff,
			size: 8.883397,
			vertexColors: THREE.VertexColors,
			map: THREE.ImageUtils.loadTexture('img/woman.png'),
			opacity: 100,
			transparent: true
		});
		material.castShadow = true;
		material.recieveShadow = true;
		
		var particleSystem = new THREE.Points(layer, material);
		particleSystem.castShadow = true;
		particleSystem.recieveShadow = true;
		particleSystem.shading = THREE.FlatShading;
		particleSystem.sortParticles = true;
		particleSystem.rotateZ(135 * (Math.PI / 180));
		App.tojo.particleSystems.push(particleSystem);
		App.tojo.scene.add(particleSystem);	
		
		App.renderer.render(App.tojo.scene, App.camera);
		App.tojo.AnimateScene();
	};
	img.style.display = "none";
	img.src = 'img/logo2.png';	

	var texture = THREE.ImageUtils.loadTexture( "img/grass.png" );
	texture.wrapS = THREE.RepeatWrapping; 
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 2500, 2500 ); 

	var geometry = new THREE.PlaneGeometry( 10000, 10000, 1, 1 );
	var planeMaterial = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
	var ground = new THREE.Mesh( geometry, planeMaterial );
	ground.position.x = 0;
	ground.position.y = 0;
	ground.position.z = -1;
	ground.shading = THREE.FlatShading;
	ground.rotateZ(135 * (Math.PI / 180));
	this.scene.add( ground );

	/*var light = new THREE.SpotLight(0xffffff);
	light.power = .2;
	light.target = ground;
	light.shadowCameraVisible = true;
	App.tojo.scene.add(light.target);
	light.shadowDarkness = 10000;
	light.castShadow = true;	
	light.position.set(400, 400, 10);
	this.scene.add(light);*/

	var light = new THREE.AmbientLight(0xffffff, .01);
	this.scene.add( light );

	starStart = counter;
	
	var stars = 10000;
	var counter = 0;
	var pixels = new Pixel({
		position: new Float32Array( stars * 3 ),
		color: [],
		size: new Float32Array( stars )
	});
	var layer1 = new THREE.Geometry();				
	layer1.verticesNeedUpdate = true;
	layer1.normalsNeedUpdate = true;
	layer1.colorsNeedUpdate = true;
	layer1.uvsNeedUpdate = true;	
	this.layers.push(layer1);
	for(var x = 0; x < stars; x++){

		pixels.position[ 3 * counter ] = 100000 * Math.cos((Math.random() / 3 * 1000) * (Math.PI / 180));//(Math.random() - .5) * -10000;		
		pixels.position[ 3 * counter + 1 ] =  100000 * Math.sin((Math.random() / 3 * 1000) * (Math.PI / 180));//(Math.random() - .5) * 10000;
		pixels.position[ 3 * counter + 2 ] = (Math.random() - .5) * 1000000;

		pixels.size[counter] = 100;

		var spot = new THREE.Vector3(pixels.position[ 3 * counter ], pixels.position[ 3 * counter + 1 ], pixels.position[ 3 * counter + 2 ])	
		layer1.vertices.push(spot)
		counter++;
	}

	var material1 = new THREE.PointsMaterial( 
	{
		color: 0xffffff,
		size: 1000.883397,
		map: THREE.ImageUtils.loadTexture('img/star.png'),
		opacity: 1,
		transparent: true
	});
	
	var particleSystem = new THREE.Points(layer1, material1);
	particleSystem.shading = THREE.FlatShading;
	this.particleSystems.push(particleSystem);
	this.scene.add(particleSystem);

	App.renderer.render(this.scene, App.camera);

	var main = document.getElementById( 'mainCanvas' );
	main.style.visibility = "visible";
}	

tojo10.prototype.RedrawScene = function() {
	this.RedrawSceneFrame();
	this.UpdateSceneCamera();
	this.UpdateUserInput();
	this.UpdateMusic();
	App.renderer.render( this.scene, App.camera );
}

var elapsedTime = 0;
var cameraClock = new THREE.Clock();
tojo10.prototype.RedrawSceneFrame = function() {	
	for(var a = 1; a < this.layers.length; a++) {
		var pixels = this.particleSystems[a].geometry.vertices;
		var xEdge = 1000;
		var go = cameraClock.getDelta();
		elapsedTime += go;
		if(elapsedTime <= 1 / 25) {
			elapsedTime += go;
			return;
		} 
		elapsedTime = 0;
		for ( var i = 0; i < pixels.length; i++ ) {
			pixels[i].x += (Math.random() - .5) * this.animationSpeed; 
			pixels[i].y += (Math.random() - .5) * this.animationSpeed;
			if(breadth == 0) {			
				pixels[i].z = -3;
			}
			else if(breadth > 0 && breadth < 2) {
				if(Math.floor(i % (pixels.length / (pixels.length * breadth))) == 0) {
					pixels[i].z = 1;
				}
				else {
					pixels[i].z = -3;					
				}
			}			
			else {
				pixels[i].z = 1;
			}		
		}		
		this.particleSystems[a].geometry.__dirtyVertices = true;
		this.particleSystems[a].geometry.verticesNeedUpdate = true;
	}
}
  
var xStepFactor = .00386699;
var yStepFactor = .00386699;
var zStepFactor = .00386699;

var XMax = 500, XMin = -500;
var YMax = 515, YMin = -515;
var ZMax = 210, ZMin = 2;
tojo10.prototype.UpdateSceneCamera = function() {
	
	var camera = App.camera;	
	camera.xStep = (camera.destination.x - camera.origin.x) * xStepFactor;	
	camera.yStep = (camera.destination.y - camera.origin.y) * yStepFactor;	
	camera.zStep = (camera.destination.z - camera.origin.z) * zStepFactor;	
	var newX = camera.position.x + camera.xStep;
	var newY = camera.position.y + camera.yStep;
	var newZ = camera.position.z + camera.zStep;

	if(newX > XMax || newX < XMin || newY > YMax || newY < YMin || newZ > ZMax || newZ < ZMin){
		var X = Math.random() * (XMax - XMin) + XMin;
		var Y = Math.random() * (YMax - YMin) + YMin;
		var Z = Math.random() * (ZMax - ZMin) + ZMin;
		camera.destination = new THREE.Vector3(X, Y, Z);
		camera.origin = new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z);		
	}
	
	camera.lookAt(0,0,0);
	camera.up = new THREE.Vector3(0,0,1);
	camera.position.set(newX, newY, newZ);
}

//USER EVENTS
tojo10.prototype.UpdateUserInput = function() {	
	this.UpdateUserMouse();
}

tojo10.prototype.UpdateUserMouse = function() {
	App.mouse.update();
}

//ANIMATION
var stopScene = false;
tojo10.prototype.AnimateScene = function(fps) {
	if(stopScene) {
		startScene = false;
		return;
	}
	App.tojo.RedrawScene();
	requestAnimationFrame(App.tojo.AnimateScene);
}

var clock = new THREE.Clock();
var clockTime = 0;
tojo10.prototype.UpdateMusic = function() {
	var delta = clock.getDelta() * 1000;
	clockTime += delta;
	if(clockTime > 1000) {
		/*if(!App.Sound.on) {
			App.Sound.Load();
			App.Sound.Play();
		}*/			
		clockTime = 0;
	}
}
