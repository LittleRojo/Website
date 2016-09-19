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

	this.clock = new THREE.Clock();
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
		//layer.addAttribute("color", new THREE.BufferAttribute(pixels.color, 4));
		//layer.addAttribute("position", new THREE.BufferAttribute(positions, 3));
		//layer.addAttribute("size", new THREE.BufferAttribute(pixels.size, 1));
		layer.verticesNeedUpdate = true;
		layer.normalsNeedUpdate = true;
		layer.colorsNeedUpdate = true;
		layer.uvsNeedUpdate = true;
		//layer.castShadow = true;
		//layer.recieveShadow = true;		
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
				//pixels.color[counter].setHSL( Math.random(), 1.0, 0.5 );
						
				/*pixels.color[ 4 * counter + 1 ] = pixel.data[1];
				pixels.color[ 4 * counter + 2 ] = pixel.data[2];
				pixels.color[ 4 * counter + 3 ] = pixel.data[3];*/

				pixels.position[ 3 * counter ] = x - width;
				pixels.position[ 3 * counter + 1 ] = (img.height - y) - height;
				pixels.position[ 3 * counter+ 2 ] = 0;//( Math.random() * 2 - 1 ) * this.radius;
				var s = Math.random() / 3 * 1000;
				var t = Math.random() / 3 * 1000;
				var cosS = Math.cos(s * (Math.PI / 180));
				var cosT = Math.cos(t * (Math.PI / 180));
				var sinS = Math.sin(s * (Math.PI / 180));
				var sinT = Math.sin(t * (Math.PI / 180));
				//x = r * cos(s) * sin(t)
				//y = r * sin(s) * sin(t)
				//z = r * cos(t)

				//pixels.position[ 3 * counter ] = 100 * cosS * sinT;//(Math.random() - .5) * -10000;		
				//pixels.position[ 3 * counter + 1 ] = 100 * sinS * sinT;//(Math.random() - .5) * 10000;
				//pixels.position[ 3 * counter + 2 ] = 100 * cosT;
				//pixels.size[counter] = 1;

				//pixels.xDirection = 1;
				//pixels.yDirection = 1;
				//pixels.zDirection = -1;

				var spot = new THREE.Vector3(pixels.position[ 3 * counter ], pixels.position[ 3 * counter + 1 ], pixels.position[ 3 * counter + 2 ])	
				layer.vertices.push(spot)
				counter++;
			}
		}
		/*starStart = counter;
		for(var x = 0; x < stars; x++){
			
			pixels.color[counter ] = new THREE.Color("rgb(255,255,255)");

			pixels.position[ 3 * counter ] = 1000 * Math.cos((Math.random() / 3 * 1000) * (Math.PI / 180));//(Math.random() - .5) * -10000;		
			pixels.position[ 3 * counter + 1 ] =  1000 * Math.sin((Math.random() / 3 * 1000) * (Math.PI / 180));//(Math.random() - .5) * 10000;
			pixels.position[ 3 * counter+ 2 ] = Math.random() * 1000;

			pixels.size[counter] = 100;

			var spot = new THREE.Vector3(pixels.position[ 3 * counter ], pixels.position[ 3 * counter + 1 ], pixels.position[ 3 * counter + 2 ])	
			layer.vertices.push(spot)
			counter++;
		}*/

		layer.colors = pixels.color;
		var material = new THREE.PointsMaterial( 
		{
			color: 0xffffff,
			size: 2.883397,//2.7479,
			//blending: THREE.AdditiveBlending,
			vertexColors: THREE.VertexColors,
			map: THREE.ImageUtils.loadTexture('woman.png'),
			opacity: 100,
			transparent: true
		});
		material.castShadow = true;
		material.recieveShadow = true;
		//material.needsUpdate = true;
		
		var particleSystem = new THREE.Points(layer, material);
		particleSystem.castShadow = true;
		particleSystem.recieveShadow = true;
		particleSystem.shading = THREE.FlatShading;
		particleSystem.sortParticles = true;
		//layer.attributes.color.needsUpdate = true;
		//layer.attributes.size.needsUpdate = true;
		//layer.attributes.position.needsUpdate = true;
		//material.needsUpdate = true;
		
		//var particleSystem = new THREE.Mesh(layer, material);
		//particleSystem.geometry.attributes.color.needsUpdate = true;
		App.tojo.particleSystems.push(particleSystem);
		App.tojo.scene.add(particleSystem);	
		
		App.renderer.render(App.tojo.scene, App.camera);
		App.tojo.AnimateScene();
	};
	img.style.display = "none";
	img.src = 'logo.png';	

	/*var dirLight = new THREE.DirectionalLight(0x00ff00, 1);
    dirLight.position.set(180, 240, 80);
    this.scene.add(dirLight);*/

	/*var bluePoint = new THREE.PointLight(0x0033ff, 0, 0);
	bluePoint.position.set( 0, 0, 10 );
	this.scene.add(bluePoint);
	this.scene.add(new THREE.PointLightHelper(bluePoint, 0));*/

	

	var ambientLight = new THREE.AmbientLight(0xfffff, .3);
	this.scene.add(ambientLight); 

	var geometry = new THREE.PlaneGeometry( 10000, 10000, 1, 1 );
	var planeMaterial = new THREE.MeshLambertMaterial( { color: 0x00ff00  } );
	var ground = new THREE.Mesh( geometry, planeMaterial );
	ground.position.x = 0;
	ground.position.y = 0;
	ground.position.z = -1;
	//ground.receiveShadow = true;
	ground.shading = THREE.FlatShading;
	this.scene.add( ground );

	var light = new THREE.SpotLight(0xffffff);
	light.power = .3;
	//light.target = particleSystem;
	App.tojo.scene.add(light.target);
	light.shadowDarkness = 100;
	light.castShadow = true;
	/*light.shadowCameraRight     =  5;
	light.shadowCameraLeft     = -5;
	light.shadowCameraTop      =  5;
	light.shadowCameraBottom   = -5;*/
	//light.target.position.set( 0, 0, 0 );
	//light.shadow.camera.near = true;
	//light.position.set(-70, -100, 90);
	light.position.set(5000, 1000, 1000);
	this.scene.add(light);

	starStart = counter;
	

	var stars = 10000;
	var counter = 0;
	var pixels = new Pixel({
		position: new Float32Array( stars * 3 ),
		color: [],
		size: new Float32Array( stars )
	});
	var layer1 = new THREE.Geometry();				
	//layer.addAttribute("color", new THREE.BufferAttribute(pixels.color, 4));
	//layer.addAttribute("position", new THREE.BufferAttribute(positions, 3));
	//layer.addAttribute("size", new THREE.BufferAttribute(pixels.size, 1));
	layer1.verticesNeedUpdate = true;
	layer1.normalsNeedUpdate = true;
	layer1.colorsNeedUpdate = true;
	layer1.uvsNeedUpdate = true;
	//layer.castShadow = true;
	//layer.recieveShadow = true;		
	this.layers.push(layer1);
	for(var x = 0; x < stars; x++){
		
		//pixels.color[ counter ] = new THREE.Color("rgb(255,255,255)");

		pixels.position[ 3 * counter ] = 100000 * Math.cos((Math.random() / 3 * 1000) * (Math.PI / 180));//(Math.random() - .5) * -10000;		
		pixels.position[ 3 * counter + 1 ] =  100000 * Math.sin((Math.random() / 3 * 1000) * (Math.PI / 180));//(Math.random() - .5) * 10000;
		pixels.position[ 3 * counter + 2 ] = (Math.random() - .5) * 1000000;

		pixels.size[counter] = 100;

		var spot = new THREE.Vector3(pixels.position[ 3 * counter ], pixels.position[ 3 * counter + 1 ], pixels.position[ 3 * counter + 2 ])	
		layer1.vertices.push(spot)
		counter++;
	}

	//geometry.colors = pixels.color;
	var material1 = new THREE.PointsMaterial( 
	{
		color: 0xffffff,
		size: 1000.883397,//2.7479,
		//blending: THREE.AdditiveBlending,
		//vertexColors: THREE.VertexColors,
		map: THREE.ImageUtils.loadTexture('star.png'),
		opacity: 1,
		transparent: true
	});
	//material.needsUpdate = true;
	
	var particleSystem = new THREE.Points(layer1, material1);
	//particleSystem.castShadow = true;
	//particleSystem.recieveShadow = true;
	particleSystem.shading = THREE.FlatShading;
	//layer.attributes.color.needsUpdate = true;
	//layer.attributes.size.needsUpdate = true;
	//layer.attributes.position.needsUpdate = true;
	//material.needsUpdate = true;
	
	//var particleSystem = new THREE.Mesh(layer, material);
	//particleSystem.geometry.attributes.color.needsUpdate = true;
	this.particleSystems.push(particleSystem);
	this.scene.add(particleSystem);

	App.renderer.render(this.scene, App.camera);
}	

tojo10.prototype.RedrawScene = function() {
	this.RedrawSceneFrame();
	this.UpdateSceneCamera();
	this.UpdateSceneLighting();
	this.UpdateUserInput();
	App.renderer.render( this.scene, App.camera );
	//this.CalculateFPS();
}

var elapsedTime = 0;
tojo10.prototype.RedrawSceneFrame = function() {	
	for(var a = 1; a < this.layers.length; a++) {
		var pixels = this.particleSystems[a].geometry.vertices;
		var xEdge = 1000;
		var go = this.clock.getDelta();
		elapsedTime += go;
		if(elapsedTime <= 1 / 25) {
			elapsedTime += go;
			return;
		} 
		elapsedTime = 0;
		for ( var i = 0; i < pixels.length; i++ ) {
			//if(i >= starStart) break;
			//if(pixels[i].x <-xEdge || pixels[i].x > xEdge) {
			//	pixels[i].xDirection = pixels[i].xDirection * -1;
			//	}

			pixels[i].x += (Math.random() - .5) * .5; 
			pixels[i].y += (Math.random() - .5) * .5;
			
			
			//var theta = 1;
			//var x = pixels[i].x;
			//var z = pixels[i].y;

			//pixels[i].x = x * Math.cos(theta) + z * Math.sin(theta) + 1;
			//pixels[i].y = z * Math.cos(theta) - x * Math.sin(theta) + 1;

			//var vector = new THREE.Vector3( 1, 0, 0 );
			//var axis = new THREE.Vector3( 0, 0, 1 );
			//var angle = Math.PI / Math.random() / 100;

			//pixels[i].applyAxisAngle( axis, angle );
		/////pixels[i].x += Math.random() / 1;
			
			//var pos = new THREE.Vector3(App.tojo.scene.position); 
			//pos.x += 100;
			//App.camera.lookAt(pos);
			
			//rotateX(30);
			
			//pixels[i].y += i * .00001;//( Math.random() * 8 - 1 ) * this.radius;
			//pixels[i].z += 0;//( Math.random() * 2 - 1 ) * this.radius;
		}		
		this.particleSystems[a].geometry.__dirtyVertices = true;
		this.particleSystems[a].geometry.verticesNeedUpdate = true;
	}
}
  
  function rotateX(rot) {
	  var camera = App.camera;
        var x = camera.position.x,
            y = camera.position.y,
            z = camera.position.z;

        camera.position.x = x * Math.cos(rot) + z * Math.sin(rot);
        camera.position.z = z * Math.cos(rot) - x * Math.sin(rot);

        camera.lookAt(App.tojo.scene.position);
    }

    function rotateY(rot) {
		var camera = App.camera;
        var x = camera.position.x,
            y = camera.position.y,
            z = camera.position.z;

        camera.position.z = z * Math.cos(rot) + y * Math.sin(rot);
        camera.position.y = y * Math.cos(rot) - z * Math.sin(rot);

        camera.lookAt(App.tojo.scene.position);     
    }

var xStepFactor = 500;
var yStepFactor = 500;
var zStepFactor = 500;

var XMax = 200, XMin = -200;
var YMax = 215, YMin = -215;
var ZMax = 110, ZMin = 2;
tojo10.prototype.UpdateSceneCamera = function() {
	
	var camera = App.camera;
	camera.xStep = (camera.destination.x - camera.origin.x) / xStepFactor;
	var newX = camera.position.x + camera.xStep;
	camera.yStep = (camera.destination.y - camera.origin.y) / yStepFactor;
	var newY = camera.position.y + camera.yStep;
	camera.zStep = (camera.destination.z - camera.origin.z) / zStepFactor;
	var newZ = camera.position.z + camera.zStep;

	if(newX > XMax || newX < XMin){
		xStepFactor = xStepFactor * Math.random() - (1300 - 700) + 900;
		yStepFactor = yStepFactor * Math.random() - (1300 - 700) + 900;
		zStepFactor = zStepFactor * Math.random() - (1300 - 700) + 900;
		var X = Math.random() * (XMax - XMin) + XMin;
		var Y = Math.random() * (YMax - YMin) + YMin;
		var Z = Math.random() * (ZMax - ZMin) + ZMin;
		camera.origin = new THREE.Vector3(newX, newY, newZ);
		camera.destination = new THREE.Vector3(X, Y, Z);
		//camera.target.position(new THREE.Vector3(X, Y, Z));
	}
	if(newY > YMax || newY < YMin){
		xStepFactor = xStepFactor * Math.random() - (1300 - 700) + 900;
		yStepFactor = yStepFactor * Math.random() - (1300 - 700) + 900;
		zStepFactor = zStepFactor * Math.random() - (1300 - 700) + 900;
		var X = Math.random() * (XMax - XMin) + XMin;
		var Y = Math.random() * (YMax - YMin) + YMin;
		var Z = Math.random() * (ZMax - ZMin) + ZMin;
		camera.origin = new THREE.Vector3(newX, newY, newZ);
		camera.destination = new THREE.Vector3(X, Y, Z);
		//camera.target.position(new THREE.Vector3(X, Y, Z));
	}
	if(newZ > ZMax || newZ < ZMin){
		xStepFactor = xStepFactor * Math.random() - (1300 - 700) + 900;
		yStepFactor = yStepFactor * Math.random() - (1300 - 700) + 900;
		zStepFactor = zStepFactor * Math.random() - (1300 - 700) + 900;
		var X = Math.random() * (XMax - XMin) + XMin;
		var Y = Math.random() * (YMax - YMin) + YMin;
		var Z = Math.random() * (ZMax - ZMin) + ZMin;
		camera.origin = new THREE.Vector3(newX, newY, newZ);
		camera.destination = new THREE.Vector3(X, Y, Z);
		//camera.target.position(new THREE.Vector3(X, Y, Z));
	}

	camera.position.set(newX, newY, newZ);
	camera.up = new THREE.Vector3(0,0,1);
	//camera.lookAt(camera.destination);
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