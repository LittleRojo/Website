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
	this.xhr = new XMLHttpRequest();
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
		
		App.tojo.layers.push(layer);

		var counter = 0;
		var pixels = new Pixel({
			position: new Float32Array( img.width * img.height * 3 ),
			color: [],
			size: new Float32Array( img.width * img.height )
		});
		for(var x = 0; x < img.width; x++){
			for(var y = 0; y < img.height; y++) {
				var pixel = ctx.getImageData(x, y, 1, 1);

				pixels.color[counter] = new THREE.Color("rgb(" + pixel.data[0] + "," + pixel.data[1] + "," + pixel.data[2] + ")");
				//pixels.color[counter].setHSL( Math.random(), 1.0, 0.5 );
		
				/*pixels.color[ 4 * counter ] = pixel.data[0];
				pixels.color[ 4 * counter + 1 ] = pixel.data[1];
				pixels.color[ 4 * counter + 2 ] = pixel.data[2];
				pixels.color[ 4 * counter + 3 ] = pixel.data[3];*/

				pixels.position[ 3 * counter ] = x - (img.width / 2);
				pixels.position[ 3 * counter + 1 ] = y - (img.height / 2);
				pixels.position[ 3 * counter+ 2 ] = 0;//( Math.random() * 2 - 1 ) * this.radius;

				pixels.size[counter] = 1;

				layer.vertices.push(new THREE.Vector3(pixels.position[ 3 * counter ], pixels.position[ 3 * counter + 1 ], pixels.position[ 3 * counter + 2 ]))
				counter++;
			}
		}

		layer.colors = pixels.color;
		var material = new THREE.PointsMaterial( 
		{
			color: 0xffffff,
			size: 2.7478,
			blending: THREE.AdditiveBlending,
			vertexColors: THREE.VertexColors,
			//map: THREE.ImageUtils.loadTexture('spark1.png'),
			opacity: 1,
			transparent: true
		});
		//material.needsUpdate = true;

		var particleSystem = new THREE.Points(layer, material);
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
	img.src = 'Daddy.png';			
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
		//var position = this.particleSystems[a].geometry.attributes.position.array;
		//for ( var i = 0; i < position.length; i++ ) {
			//position[ 3 * i + 0 ] += i * .00001;
			//position[ 3 * i + 1 ] += i * .00001;//( Math.random() * 8 - 1 ) * this.radius;
			//position[ 3 * i + 2 ] += 0;//( Math.random() * 2 - 1 ) * this.radius;
		//}		
		this.particleSystems[a].geometry.verticesNeedUpdate = true;
	}
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