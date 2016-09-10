var renderer;
var camera;
var scene;
var raycaster;
var keyboard;
var mouse;
var projector;
var gps;

var objects = [];
var intersection, offset;
var INTERSECTED,SELECTED
var plane;
var targetRotation = 0;
var targetRotationOnMouseDown = 0;
var mouseX = 0;
var mouseXOnMouseDown = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var material;
var geometry;

window.requestAnimFrame = ( function( callback ) {
		return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function ( callback ) {
			window.setTimeout( callback, 1000 / 60 );
		};
	})();

function tojo6(canvas) {
	renderer = new THREE.WebGLRenderer({ canvas:canvas, antilias: true, alpha: true, clearAlpha: 1});	
	renderer.setSize( window.innerWidth, window.innerHeight );
	//window.renderer.sortObjects = false;
	window.renderer.shadowMap.enabled = true;
	window.renderer.shadowMap.type = THREE.PCFShadowMap;

	window.camera = new THREE.PerspectiveCamera( 90, window.innerWidth / (window.innerHeight), 1, 10000 );	
	window.camera.position.set( 40, 100, 1010 );
	window.camera.lookAt(new THREE.Vector3(0, 0, 0));

	/*window.camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -1000, 1000 );
	window.camera.position.set( 20, 120, 992 );
	window.camera.lookAt(new THREE.Vector3(0, 0, 0));*/

	window.scene = new THREE.Scene();

	window.raycaster = new THREE.Raycaster();
	//window.keyboard = new THREEx.KeyboardState();
	//window.mouse = new THREE.TrackballControls( window.camera );
	window.projector = new THREE.Projector();

	if ("geolocation" in navigator) {
		window.gps = 1;
	} 
	else {
		window.gps = 0;
	}

	window.offset = new THREE.Vector3(),
	window.intersection = new THREE.Vector3(),
	window.plane = new THREE.Plane();

	window.scene.add( new THREE.AmbientLight( 0xffffff ));
	window.light = new THREE.DirectionalLight( 0xffffff );

    	//LIGHT 1
	window.light.position.set( 0, 1, 1 ).normalize();
	window.scene.add(window.light);

	//LIGHT 2
	window.light.position.set(.3, .8, .2);
	window.light.target.position.set(0, 0, 0);
	window.light.castShadow = true;
	window.light.shadowDarkness = 0.5;
	window.light.shadowCameraVisible = true; // only for debugging
	// these six values define the boundaries of the yellow box seen above
	window.light.shadowCameraNear = 2;
	window.light.shadowCameraFar = 5;
	window.light.shadowCameraLeft = -0.5;
	window.light.shadowCameraRight = 0.5;
	window.light.shadowCameraTop = 0.5;
	window.light.shadowCameraBottom = -0.5;

	window.scene.add(window.light);

	return {
		windowHalfX:window.windowHalfX,
		windowHalfY:window.windowHalfY,
		targetRotation:window.targetRotation,
		targetRotationOnMouseDown:window.targetRotationOnMouseDown,
		mouseX:window.mouseX,
		mouseXOnMouseDown:window.mouseXOnMouseDown,
		renderer:window.renderer,
		camera:window.camera,
		scene:window.scene,
		raycaster:window.raycaster,
		keyboard:window.keyboard,
		projector:window.projector,
		mouse:window.mouse,
		plane:window.plane,
		alpha:window.alpha,
		init:window.init,
		renderNextFrame:window.renderNextFrame,
		adjustNextFrameStaging:window.adjustNextFrameStaging,
		animate:window.animate,
		drawScene:window.drawScene,
		onMouseDown:window.onMouseDown,
		onMouseUp:window.onMouseUp,
		onMouseMove:window.onMouseMove,
		intersection:window.intersection,
		offset:window.offset,
		INTERSECTED:window.INTERSECTED,
		SELECTED:window.SELECTED,

		DrawScene:this.DrawScene,
		UpdateScene:this.UpdateScene,
		UpdateSceneFrame:this.UpdateSceneFrame,
		UpdateSceneCamera:this.UpdateSceneCamera,
		UpdateSceneLighting:this.UpdateSceneLighting,
		StartAnimation:this.StartAnimation,
		StopAnimation:this.StopAnimation,
		AnimateScene:this.AnimateScene,
		UpdateUser:this.UpdateUser,
		UpdateUserKeyboard:this.UpdateUserKeyboard,
		UpdateUserMouse:this.UpdateUserMouse
	};
  }


//GRAPHICS
var widthSegmentsX = [ 1, 100 ];
var widthSegmentsY = [ 1, 100 ];
var widthSegmentsZ = [ 1, 100 ];

var widthSegmentsX = 10;
var heightSegmentsX = 10;
var widthSegmentsY = 50;
var heightSegmentsY = 2;
var widthSegmentsZ = 20;
var heightSegmentsZ = 10;

var meshX;
var meshY;
var meshZ;

var DrawScene = tojo6.prototype.DrawScene = function() {
	
	//DRAW Scene
	// X PLANE
	var geometry = new THREE.PlaneGeometry( 1000, 1000, widthSegmentsX, heightSegmentsX );
	var material = new THREE.MeshBasicMaterial( { color: 0x0000ff, side: THREE.DoubleSide  } ); //BLUE
	meshX = new THREE.Mesh( geometry, material );
	window.scene.add( meshX );

	// Y PLANE
	var geometryY = new THREE.PlaneGeometry( 1000, 1000, widthSegmentsY, heightSegmentsY );
	var materialY = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide } ); //RED
	meshY = new THREE.Mesh( geometryY, materialY );
	window.scene.add( meshY );

	// Z PLANE
	var geometryZ = new THREE.PlaneGeometry( 1000, 1000, widthSegmentsZ, heightSegmentsZ );
	var materialZ = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.DoubleSide  } ); //GREEN
	meshZ = new THREE.Mesh( geometryZ, materialZ );
	window.scene.add( meshZ );

	window.renderer.render( window.scene, window.camera );
}



var UpdateScene = tojo6.prototype.UpdateScene = function() {  
	window.UpdateSceneFrame();
	window.UpdateSceneCamera();
	window.UpdateSceneLighting();

	window.renderer.render( window.scene, window.camera );
}

var UpdateSceneFrame = tojo6.prototype.UpdateSceneFrame = function() {
	
	var max = 20;
	window.widthSegmentsX++;
	window.heightSegmentsX += 5;
	window.widthSegmentsY++;
	window.heightSegmentsY += 15;
	window.widthSegmentsZ++;
	window.heightSegmentsZ++;

	if(window.widthSegmentsX >= max) {
		window.widthSegmentsX = 0;
	}
	if(window.widthSegmentsY >= max) {
		window.widthSegmentsY = 0;
	}
	if(window.widthSegmentsZ >= max) {
		window.widthSegmentsZ = 0;
	}
	if(window.heightSegmentsX >= max) {
		window.heightSegmentsX = 0;
	}
	if(window.heightSegmentsY >= max) {
		window.heightSegmentsY = 0;
	}
	if(window.heightSegmentsZ >= max) {
		window.heightSegmentsZ = 0;
	}

	// X PLANE
	var geometry = new THREE.PlaneGeometry( 1000, 1000, widthSegmentsX, heightSegmentsX );
	var material = new THREE.MeshBasicMaterial( { color: 0x0000ff, side: THREE.DoubleSide  } ); //BLUE
	meshX = new THREE.Mesh( geometry, material );
	meshX.trans
	window.scene.add( meshX );

	// Z PLANE
	var geometryZ = new THREE.PlaneGeometry( 1000, 1000, widthSegmentsZ, heightSegmentsZ );
	var materialZ = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.DoubleSide  } ); //GREEN
	meshZ = new THREE.Mesh( geometryZ, materialZ );
	window.scene.add( meshZ );

	// Y PLANE
	var geometryY = new THREE.PlaneGeometry( 1000, 1000, widthSegmentsY, heightSegmentsY );
	var materialY = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide } ); //RED
	meshY = new THREE.Mesh( geometryY, materialY );
	window.scene.add( meshY );
}
  
var UpdateSceneCamera = tojo6.prototype.UpdateSceneCamera = function() {
	/*if(window.direction == 1) {
		window.speed += .005;
	}
	else {
		window.speed -= .005;
	}
	if(window.speed > 1) {
		window.direction = 0;
	}
	else if(window.speed < .5) {
		window.direction = 1;
	}

	window.theta += window.speed;
	window.background.camera.position.x = window.radius * Math.cos( THREE.Math.degToRad( window.theta ) );
	window.background.camera.position.y = window.radius * Math.cos( THREE.Math.degToRad( window.theta ) );
	window.background.camera.position.z = window.radius * Math.sin( THREE.Math.degToRad( window.theta ) );
	window.background.camera.lookAt( window.background.scene.position );
	window.background.camera.updateMatrixWorld();

	window.light.position.x = window.radius * Math.cos( THREE.Math.degToRad( window.theta ) );
	window.light.position.y = window.radius * Math.cos( THREE.Math.degToRad( window.theta ) );
	window.light.position.z = window.radius * Math.sin( THREE.Math.degToRad( window.theta ) );
	window.light.lookAt( window.background.scene.position );
	window.light.updateMatrixWorld();

	window.background.raycaster.setFromCamera( window.background.mouse, window.background.camera );
	var intersects = window.background.raycaster.intersectObjects( window.background.scene.children );

	if ( intersects.length > 0 ) {
		if ( window.INTERSECTED != intersects[ 0 ].object ) {
			if ( window.INTERSECTED ) window.INTERSECTED.material.program = window.programStroke;
			window.INTERSECTED = intersects[ 0 ].object;
			window.INTERSECTED.material.program = window.programFill;
		}
	} else {
		if ( window.INTERSECTED ) window.INTERSECTED.material.program = window.programStroke;
		window.INTERSECTED = null;
	}*/
}

var UpdateSceneLighting = tojo6.prototype.UpdateSceneLighting = function() {
	/*if(window.direction == 1) {
		window.speed += .005;
	}
	else {
		window.speed -= .005;
	}
	if(window.speed > 1) {
		window.direction = 0;
	}
	else if(window.speed < .5) {
		window.direction = 1;
	}

	window.theta += window.speed;
	window.background.camera.position.x = window.radius * Math.cos( THREE.Math.degToRad( window.theta ) );
	window.background.camera.position.y = window.radius * Math.cos( THREE.Math.degToRad( window.theta ) );
	window.background.camera.position.z = window.radius * Math.sin( THREE.Math.degToRad( window.theta ) );
	window.background.camera.lookAt( window.background.scene.position );
	window.background.camera.updateMatrixWorld();

	window.light.position.x = window.radius * Math.cos( THREE.Math.degToRad( window.theta ) );
	window.light.position.y = window.radius * Math.cos( THREE.Math.degToRad( window.theta ) );
	window.light.position.z = window.radius * Math.sin( THREE.Math.degToRad( window.theta ) );
	window.light.lookAt( window.background.scene.position );
	window.light.updateMatrixWorld();

	window.background.raycaster.setFromCamera( window.background.mouse, window.background.camera );
	var intersects = window.background.raycaster.intersectObjects( window.background.scene.children );

	if ( intersects.length > 0 ) {
		if ( window.INTERSECTED != intersects[ 0 ].object ) {
			if ( window.INTERSECTED ) window.INTERSECTED.material.program = window.programStroke;
			window.INTERSECTED = intersects[ 0 ].object;
			window.INTERSECTED.material.program = window.programFill;
		}
	} else {
		if ( window.INTERSECTED ) window.INTERSECTED.material.program = window.programStroke;
		window.INTERSECTED = null;
	}*/
}

//ANIMATION
var StartAnimation = tojo6.prototype.StartAnimation = function() {
	window.UpdateScene();
	window.UpdateCameraLighting();
	window.id = requestAnimationFrame( window.AnimateScene );
}

var StopAnimation = tojo6.prototype.StopAnimation = function() {
	cancelAnimationFrame( window.id );
}

var AnimateScene = tojo6.prototype.AnimateScene = function() {
	window.UpdateScene();
	window.UpdateCameraLighting();
	//requestAnimFrame( window.AnimateScene);
	requestAnimationFrame( window.AnimateScene );
}

//USER EVENTS
var UpdateCameraLighting = tojo6.prototype.UpdateCameraLighting = function() {
	//window.UpdateUserKeyboard();
	//window.UpdateUserMouse();
}

var UpdateUserKeyboard = tojo6.prototype.UpdateUserKeyboard = function() {
	window.keyboard.update();
	window.updateKeyboard();
	//window.mouse.update();
}

var UpdateUserMouse = tojo6.prototype.UpdateUserMouse = function() {
	window.mouse.rotateSpeed = 1.0;
	window.mouse.zoomSpeed = 1.2;
	window.mouse.panSpeed = 0.8;
	window.mouse.noZoom = false;
	window.mouse.noPan = false;
	window.mouse.staticMoving = true;
	window.mouse.dynamicDampingFactor = 0.3;
	window.mouse.addEventListener( 'change', window.renderNextFrame );
}

var DrawXYZAxisLines = tojo6.prototype.DrawXYZAxisLines = function() {
	
	//DRAW Scene
	//X AXIS
	var materialX = new THREE.LineBasicMaterial({
		color: 0x0000ff //BLUE
	});
	var geometryX = new THREE.Geometry();
	geometryX.vertices.push(new THREE.Vector3(-1000, 0, 0));
	geometryX.vertices.push(new THREE.Vector3(1000, 0, 0));
	var lineX = new THREE.Line(geometryX, materialX);
	window.scene.add( lineX );

	//Y AXIS
	var materialY = new THREE.LineBasicMaterial({
		color: 0xff0000 //RED
	});
	geometryY = new THREE.Geometry();
	geometryY.vertices.push(new THREE.Vector3(0, -1000, 0));
	geometryY.vertices.push(new THREE.Vector3(0, 1000, 0));
	var lineY = new THREE.Line(geometryY, materialY);
	window.scene.add( lineY );

	//Z AXIS
	var materialZ = new THREE.LineBasicMaterial({
		color: 0x00ff000 //GREEN
	});
	geometryZ = new THREE.Geometry();
	geometryZ.vertices.push(new THREE.Vector3(0, 0, -1000));
	geometryZ.vertices.push(new THREE.Vector3(0, 0, 1000));
	var lineZ = new THREE.Line(geometryZ, materialZ);
	window.scene.add( lineZ );

	window.renderer.render( window.scene, window.camera );
}

var DrawMeshlane = tojo6.prototype.DrawMeshPlane = function() {
	
	//DRAW Scene
	// X PLANE
	var geometry = new THREE.PlaneGeometry( 1000, 1000, 10, 10 );
	var material = new THREE.MeshBasicMaterial( { color: 0x0000ff, side: THREE.DoubleSide  } ); //BLUE
	var mesh = new THREE.Mesh( geometry, material );
	window.scene.add( mesh );

	// Y PLANE
	var geometryY = new THREE.PlaneGeometry( 1000, 1000, 50, 2 );
	var materialY = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide } ); //RED
	var meshY = new THREE.Mesh( geometryY, materialY );
	window.scene.add( meshY );

	// Z PLANE
	var geometryZ = new THREE.PlaneGeometry( 1000, 1000, 20, 10 );
	var materialZ = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.DoubleSide  } ); //GREEN
	var meshZ = new THREE.Mesh( geometryZ, materialZ );
	window.scene.add( meshZ );

	window.renderer.render( window.scene, window.camera );
}