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
}

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
		layer.castShadow = true;
		layer.recieveShadow = true;		
		App.tojo.layers.push(layer);

		var counter = 0;
		var pixels = new Pixel({
			position: new Float32Array( img.width * img.height * 3 ),
			color: [],
			size: new Float32Array( img.width * img.height )
		});
		for(var x = 0; x < img.width; x++){
			if(x % 3 == 0) { continue; }
			for(var y = 0; y < img.height; y++) {
				var pixel = ctx.getImageData(x, y, 1, 1);
				if(y % 3 == 0) { continue; }
				pixels.color[counter] = new THREE.Color("rgb(" + pixel.data[0] + "," + pixel.data[1] + "," + pixel.data[2] + ")");
				if(pixels.color[counter].r == 0 && pixels.color[counter].g == 0 && pixels.color[counter].b == 0){
					continue;
				}
				//pixels.color[counter].setHSL( Math.random(), 1.0, 0.5 );
		
				/*pixels.color[ 4 * counter ] = pixel.data[0];
				pixels.color[ 4 * counter + 1 ] = pixel.data[1];
				pixels.color[ 4 * counter + 2 ] = pixel.data[2];
				pixels.color[ 4 * counter + 3 ] = pixel.data[3];*/

				pixels.position[ 3 * counter ] = x - (img.width / 2);
				pixels.position[ 3 * counter + 1 ] = (img.height - y) - (img.height / 2);
				pixels.position[ 3 * counter+ 2 ] = 0;//( Math.random() * 2 - 1 ) * this.radius;

				pixels.size[counter] = 1;

				pixels.xDirection = 1;
				pixels.yDirection = 1;
				pixels.zDirection = -1;

				var spot = new THREE.Vector3(pixels.position[ 3 * counter ], pixels.position[ 3 * counter + 1 ], pixels.position[ 3 * counter + 2 ])	
				layer.vertices.push(spot)
				counter++;
			}
		}

		layer.colors = pixels.color;
		var material = new THREE.PointsMaterial( 
		{
			color: 0xffffff,
			size: 2.883397,//2.7479,
			//blending: THREE.AdditiveBlending,
			vertexColors: THREE.VertexColors,
			//map: THREE.ImageUtils.loadTexture('spark1.png'),
			opacity: 1,
			transparent: true
		});
		//material.needsUpdate = true;
		
		var particleSystem = new THREE.Points(layer, material);
		//particleSystem.castShadow = true;
		//particleSystem.recieveShadow = true;
		particleSystem.shading = THREE.FlatShading;
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

	var light = new THREE.SpotLight(0xffffff);
	light.intensity = 50;
	//light.shadowDarkness = 100;
	light.castShadow = true;
	//light.shadowCameraRight     =  5;
	//light.shadowCameraLeft     = -5;
	//light.shadowCameraTop      =  5;
	//light.shadowCameraBottom   = -5;
	//light.target.position.set( 0, 0, 0 );
	light.shadow.camera.near = true;
	light.position.set(-70, -100, 90);
	App.tojo.scene.add(light);

	var geometry = new THREE.PlaneGeometry( 10000, 10000, 1, 1 );
	var planeMaterial = new THREE.MeshLambertMaterial( { color: 0x00ff00, side: THREE.DoubleSide } );
	var ground = new THREE.Mesh( geometry, planeMaterial );
	ground.position.z = -1;
	ground.receiveShadow = true;
	this.scene.add( ground );

	/*var stars = 100000;
	var counter = 0;
	var pixels = new Pixel({
		position: new Float32Array( stars * 3 ),
		color: [],
		size: new Float32Array( stars )
	});
	for(var x = 0; x < stars; x++){
		
		pixels.color[ 4 * counter ] = 255;
		pixels.color[ 4 * counter + 1 ] = 255;
		pixels.color[ 4 * counter + 2 ] = 255;
		pixels.color[ 4 * counter + 3 ] = 1;

		pixels.position[ 3 * counter ] = -Math.random();
		pixels.position[ 3 * counter + 1 ] = -Math.random();
		pixels.position[ 3 * counter+ 2 ] = -Math.random();

		pixels.size[counter] = 100;

		var spot = new THREE.Vector3(pixels.position[ 3 * counter ], pixels.position[ 3 * counter + 1 ], pixels.position[ 3 * counter + 2 ])	
		layer.vertices.push(spot)
		counter++;
	}

	layer.colors = pixels.color;
	var material = new THREE.PointsMaterial( 
	{
		color: 0xffffff,
		size: 2.883397,//2.7479,
		//blending: THREE.AdditiveBlending,
		vertexColors: THREE.VertexColors,
		//map: THREE.ImageUtils.loadTexture('spark1.png'),
		opacity: 1,
		transparent: true
	});
	//material.needsUpdate = true;
	
	var particleSystem = new THREE.Points(layer, material);
	//particleSystem.castShadow = true;
	//particleSystem.recieveShadow = true;
	particleSystem.shading = THREE.FlatShading;
	//layer.attributes.color.needsUpdate = true;
	//layer.attributes.size.needsUpdate = true;
	//layer.attributes.position.needsUpdate = true;
	//material.needsUpdate = true;
	
	//var particleSystem = new THREE.Mesh(layer, material);
	//particleSystem.geometry.attributes.color.needsUpdate = true;
	App.tojo.particleSystems.push(particleSystem);
	App.tojo.scene.add(particleSystem);	*/

	//App.renderer.render(App.tojo.scene, App.camera);
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
		var pixels = this.particleSystems[a].geometry.vertices;
		var xEdge = 1000;
		for ( var i = 0; i < pixels.length; i++ ) {
			//if(pixels[i].x <-xEdge || pixels[i].x > xEdge) {
			//	pixels[i].xDirection = pixels[i].xDirection * -1;
			//	}

			pixels[i].x += (Math.random() - .5) * 0.7; 
			pixels[i].y += (Math.random() - .5) * 0.7;
			
			
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