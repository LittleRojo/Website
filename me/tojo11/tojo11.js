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

    this.scene.fog = new THREE.Fog( 0xffffff, 1, 5000 );
    this.scene.fog.color.setHSL( 0.6, 0, 1 );

    //LIGHTS
    hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 0, 500, 0 );
    this.scene.add( hemiLight );

    var d = 50;
    dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( -1, 1.75, 1 );
    dirLight.position.multiplyScalar( 50 );
    dirLight.castShadow = true;
    dirLight.shadowMapWidth = 2048;
    dirLight.shadowMapHeight = 2048;    
    dirLight.shadowCameraLeft = -d;
    dirLight.shadowCameraRight = d;
    dirLight.shadowCameraTop = d;
    dirLight.shadowCameraBottom = -d;
    dirLight.shadowCameraFar = 3500;
    dirLight.shadowBias = -0.0001;    
    dirLight.shadowCameraVisible = true;
    this.scene.add( dirLight );

    //GROUND
    var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
    var groundMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x050505 } );
    groundMat.color.setHSL( 0.095, 1, 0.75 );

    var ground = new THREE.Mesh( groundGeo, groundMat );
    ground.rotation.x = -Math.PI/2;
    ground.position.y = -33;
    ground.receiveShadow = true;
    this.scene.add( ground );    

    //DOME
    var vertexShader = document.getElementById( 'vertexShader' ).textContent;
    var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
    var uniforms = {
        topColor:    { value: new THREE.Color( 0x0077ff ) },
        bottomColor: { value: new THREE.Color( 0xffffff ) },
        offset:      { value: 33 },
        exponent:    { value: 0.6 }
    };
    uniforms.topColor.value.copy( hemiLight.color );
    this.scene.fog.color.copy( uniforms.bottomColor.value );

    var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
    var skyMat = new THREE.ShaderMaterial( { 
        vertexShader: vertexShader, 
        fragmentShader: fragmentShader, 
        uniforms: uniforms, 
        side: THREE.BackSide } );

    var sky = new THREE.Mesh( skyGeo, skyMat );
    this.scene.add( sky );

    //MIDDLE YELLO
	var geometry = new THREE.CylinderGeometry( 0, 3, 8, 1000 );
    var material = new THREE.MeshPhongMaterial( {color: 0xffff00} );
    this.yellow = new THREE.Mesh( geometry, material );
    var axis = new THREE.Vector3(0.5,0.5,0);   
    this.yellow.rotation.y = 1; 
    //this.scene.add( this.yellow );

    //GREEN BODY
    var material2 = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
    var geometry2 = new THREE.BoxBufferGeometry( 5, 5, 5 );
    this.green = new THREE.Mesh( geometry2, material2 );
    this.green.rotation.y = 1;//deg(180);
    this.scene.add( this.green );
   
	App.renderer.render( this.scene, App.camera );
}

tojo11.prototype.RedrawScene = function() {
	this.RedrawSceneFrame();
	this.UpdateSceneCamera();
	this.UpdateSceneLighting();
	this.UpdateUserInput();
    //this.CalculateFPS();

    App.renderer.render( this.scene, App.camera );
    App.effect.render( this.scene, App.camera )
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
	App.controls.update();
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
    App.effect.render(App.scene, App.camera);
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