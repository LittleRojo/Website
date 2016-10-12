function tojo11() {
	this.name = "tojo11";
	this.fps = 0;
	this.sampleSize = 5;
	this.renderLengthQueue = [];
	this.previousRenderStamp;
	this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
}

tojo11.prototype.SetupScene = function() {

    //this.scene.fog = new THREE.Fog( 0xffffff, 1, 5000 );
    //this.scene.fog.color.setHSL( 0.6, 0, 1 );

    //LIGHTS
    hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, .7 );
    hemiLight.position.set( -1, 0, 0 );
    //hemiLight.castShadow = true;
    this.scene.add( hemiLight );

    dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.position.set( 0, 5, 0 );
    dirLight.castShadow = true;
    dirLight.shadowMapWidth = 2048;
    dirLight.shadowCameraRight = 100;
    dirLight.shadowCameraLeft = -100;
    dirLight.shadowCameraTop = 100;
    dirLight.shadowCameraBottom = -100;
    dirLight.shadowMapHeight = 2048;
    //dirLight.shadowDarkness = 0.5;
    this.scene.add( dirLight );

    spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 0,100,0 );
    spotLight.shadowMapWidth = 2048;
    spotLight.shadowMapWidth = 2048;
    this.scene.add(spotLight);

    //GROUND
    var groundGeo = new THREE.PlaneGeometry( 10000, 10000, 70, 70 );
    for(var a = 0, b = groundGeo.vertices.length; a < b; a++ ){
        var factor = 25;
        if(groundGeo.vertices[a].x > 400 || groundGeo.vertices[a].x < -400 || groundGeo.vertices[a].z > 400 || groundGeo.vertices[a].z < -400) {
            factor = 100;
        }
        groundGeo.vertices[a].z = Math.random() * factor;
    }
    var groundMat = new THREE.MeshPhongMaterial( { color: 0x003300, specular: 0x050505 } );
    
    var ground = new THREE.Mesh( groundGeo, groundMat );
    ground.rotation.x = -Math.PI/2;
    ground.position.y = -33;
    ground.receiveShadow = true;
    //ground.castShadow = true;
    this.scene.add( ground );    

    //DOME
    var vertexShader = document.getElementById( 'vertexShader' ).textContent;
    var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
    var uniforms = {
        topColor:    { value: new THREE.Color( 0x000000 ) },
        bottomColor: { value: new THREE.Color( 0x000099 ) },
        offset:      { value: 33 },
        exponent:    { value: 0.6 }
    };
    uniforms.topColor.value.copy( 0x000000 );
    //this.scene.fog.color.copy( uniforms.bottomColor.value );

    var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
    var skyMat = new THREE.ShaderMaterial( { 
        vertexShader: vertexShader, 
        fragmentShader: fragmentShader, 
        uniforms: uniforms, 
        side: THREE.BackSide,
        shading: THREE.FlatShading
    } );

    var sky = new THREE.Mesh( skyGeo, skyMat );
    this.scene.add( sky );

    //MIDDLE YELLO
	var geometry = new THREE.CylinderGeometry( 0, 1.8, 7.0, 1000 );
    var material = new THREE.MeshPhongMaterial( {color: 0xFFCF00, side: THREE.DoubleSide } );
    this.yellow = new THREE.Mesh( geometry, material );
    this.yellow.rotation.z = deg(34);
    //this.yellow.position.z = 5;
    this.yellow.position.x = 4.4;
    this.yellow.position.y = .5;    
    this.scene.add( this.yellow );

    //GREEN BODY    
    var pts = [];
    pts.push( new THREE.Vector3( 7.1, -6.5,0 ));
    pts.push( new THREE.Vector3( 7.85, -1.4,0 ));
    pts.push( new THREE.Vector3( -1.5,7.0,0 ));
    pts.push( new THREE.Vector3( 1.1,-1.0,0 ));
    App.mouse.target = new THREE.Vector3( 7.1, -7.5,0 );
    var shape = new THREE.Shape( pts );
    var geometry2 = new THREE.ShapeGeometry( shape );
    var material2 = new THREE.MeshPhongMaterial( { color: 0xC1CD23, side: THREE.DoubleSide, shading: THREE.SmoothShading } );    
    this.green = new THREE.Mesh( geometry2, material2 );  
    this.green.shading = true;  
    this.green.castShadow = true;
    this.green.receiveShadow = true;
    this.scene.add( this.green );

    //ORANGE BODY - LEFT 
    var pts = [];
    pts.push( new THREE.Vector3( 7.85, -1.4,0 ));
    pts.push( new THREE.Vector3( 10.1, 0, 1 ));    
    pts.push( new THREE.Vector3( 10.8, 7.0,4 ));
    pts.push( new THREE.Vector3( 1.6,3.0,0 ));
    App.mouse.target = new THREE.Vector3( 7.1, -7.5,0 );
    var shape2 = new THREE.Shape( pts );
    var geometry3 = new THREE.ShapeGeometry( shape2 );
    var material3 = new THREE.MeshPhongMaterial( { color: 0xFF7F00, side: THREE.DoubleSide, shading: THREE.SmoothShading } );    
    this.orangeLeft = new THREE.Mesh( geometry3, material3 );  
    this.orangeLeft.shading = true;  
    this.orangeLeft.rotation.x = deg(-20);
    this.orangeLeft.rotation.y = deg(25);
    this.orangeLeft.translateZ(1.9);
    this.orangeLeft.castShadow = true;
    this.orangeLeft.receiveShadow = true;
    this.scene.add( this.orangeLeft );

    //ORANGE BODY - RIGHT 
    var pts = [];
    pts.push( new THREE.Vector3( 7.85, -1.4,0 ));
    pts.push( new THREE.Vector3( 10.1, 0,0 ));    
    pts.push( new THREE.Vector3( 10.8, 7.0,0 ));
    pts.push( new THREE.Vector3( 1.6,3.0,0 ));
    App.mouse.target = new THREE.Vector3( 7.1, -7.5,0 );
    var shape3 = new THREE.Shape( pts );
    var geometry4 = new THREE.ShapeGeometry( shape3 );
    var material4 = new THREE.MeshPhongMaterial( { color: 0xFF7F00, side: THREE.DoubleSide, shading: THREE.SmoothShading } );    
    this.orangeRight = new THREE.Mesh( geometry4, material4 );  
    this.orangeRight.shading = true;  
    this.orangeRight.rotation.x = deg(20);
    this.orangeRight.rotation.y = deg(-25);
    this.orangeRight.translateZ(-1.9);
    this.orangeRight.castShadow = true;
    this.orangeRight.receiveShadow = true;
    this.scene.add( this.orangeRight );
   
    //rotateCameraY(24.7);
	App.renderer.render( this.scene, App.camera );
}

tojo11.prototype.RedrawScene = function() {
	this.RedrawSceneFrame();
	this.UpdateSceneCamera();
	this.UpdateSceneLighting();
	this.UpdateUserInput();
    //this.CalculateFPS();

    App.renderer.render( this.scene, App.camera );
    //App.effect.render( this.scene, App.camera )
}

var degree = 0;
tojo11.prototype.RedrawSceneFrame = function() {
    //this.yellow.rotation.z = degree;
    //this.green.rotation.x = degree;
    //this.green.rotation.z = -degree;
    degree+=.01;
}
  
var camera = 1;  
tojo11.prototype.UpdateSceneCamera = function() {
    var rotSpeed = .05;
    var x = App.camera.position.x;
    var z = App.camera.position.z;
    //rotateCameraY(rotSpeed);
    //App.camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
    //App.camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
    //App.camera.lookAt(this.scene.position);
    //App.camera.rotation += 1.9;

    //App.camera2.position.x = x * Math.cos(-rotSpeed) + z * Math.sin(-rotSpeed);
    //App.camera2.position.z = z * Math.cos(-rotSpeed) - x * Math.sin(-rotSpeed);
    //App.camera2.lookAt(this.scene.position);


    
    /*var delta = this.clock.getDelta();
	var rotateAngle = Math.PI / 2 * 20; 
	var relativeCameraOffset = new THREE.Vector3(0,0,0);
	var cameraOffset = relativeCameraOffset.applyMatrix4( this.cylinder.matrixWorld );
	App.camera.position.x = cameraOffset.x;
	App.camera.position.y = cameraOffset.y;
	App.camera.position.z = cameraOffset.z;
	App.camera.lookAt( this.cylinder.position );*/

    /*var newX = App.camera.position.x;
    var newY = App.camera.position.y;
    var newZ = App.camera.position.z;

    App.camera.up = new THREE.Vector3(0,0,1);
	App.camera.position.set(newX, newY, newZ);
    App.camera.lookAt(this.cylinder.position);	*/	
    //App.camera.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);
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
	//App.controls.update();
}

//ANIMATION
var stopScene = false;
tojo11.prototype.AnimateScene = function(fps) {
    //setInterval( function() {
        if(stopScene) {
            startScene = false;
            return;
        }
        App.tojo.RedrawScene();
    //}, 0);
    if(App.vrDisplay === undefined) {
        requestAnimationFrame(App.tojo.AnimateScene);
    }
    else {    
	    App.vrDisplay.requestAnimationFrame(App.tojo.AnimateScene);
    }
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
    //for(var a = 1; a < 100000000; a++){}
}

function deg(degree)   { return degree*(Math.PI/180); }