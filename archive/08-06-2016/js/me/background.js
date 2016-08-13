var renderer;
var camera;
var scene;
var raycaster;
var keyboard;
var mouse;
var projector;

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

var tojo;

function Background(canvas) {	
	this.renderer = new THREE.WebGLRenderer({ canvas:canvas, antilias: true, alpha: true, clearAlpha: 1});	
        this.renderer.setSize( window.innerWidth, window.innerHeight );
	//this.renderer.sortObjects = false;
	this.renderer.shadowMap.enabled = true;
	this.renderer.shadowMap.type = THREE.PCFShadowMap;

        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / (window.innerHeight), 1, 900 );
        this.camera.position.set( 0, 300, 500 );
        this.scene = new THREE.Scene();

        this.raycaster = new THREE.Raycaster();
	this.keyboard = new THREEx.KeyboardState();
	this.mouse = new THREE.TrackballControls( this.camera );
	this.projector = new THREE.Projector();

	this.offset = new THREE.Vector3(),
	this.intersection = new THREE.Vector3(),
	this.plane = new THREE.Plane();

	this.tojo = new tojo4();
	mapboxgl.accessToken = 'pk.eyJ1IjoibGl0dGxlcm9qbyIsImEiOiJjaXJpbmNmazYwMDBiZmduYnJwcHE3bTFyIn0.QElYybeFCSAo-q4gRLq6cA';
	var bounds = [
		[83,-179],
		[-40,179]];
	var map = new mapboxgl.Map ({
		trackResize: true,
		dragRotate: false,
		//dragPan: false,
		//maxBounds: bounds,
		minZoom: 1.16,
		center: [7, 52],
    		container: 'map',
    		style: 'mapbox://styles/mapbox/dark-v9'
	});

	document.addEventListener( 'touchstart', this.onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', this.onDocumentTouchMove, false );
	document.addEventListener( 'deviceorientation', this.deviceOrientation, false);

	return {
		windowHalfX:this.windowHalfX,
		windowHalfY:this.windowHalfY,
		targetRotation:this.targetRotation,
		targetRotationOnMouseDown:this.targetRotationOnMouseDown,
		mouseX:this.mouseX,
		mouseXOnMouseDown:this.mouseXOnMouseDown,
		renderer:this.renderer,
		camera:this.camera,
		scene:this.scene,
		raycaster:this.raycaster,
		keyboard:this.keyboard,
		projector:this.projector,
		mouse:this.mouse,
		tojo:this.tojo,
		plane:this.plane,
		alpha:this.alpha,
		init:this.init,
		renderNextFrame:this.renderNextFrame,
		adjustNextFrameStaging:this.adjustNextFrameStaging,
		animate:this.animate,
		drawScene:this.drawScene,
		onMouseDown:this.onMouseDown,
		onMouseUp:this.onMouseUp,
		onMouseMove:this.onMouseMove,
		intersection:this.intersection,
		offset:this.offset,
		INTERSECTED:this.INTERSECTED,
		SELECTED:this.SELECTED
	};
}

Background.prototype.animate = function() {
        window.background.renderNextFrame();
        window.background.adjustNextFrameStaging();
	window.background.updateKeyboard();
        requestAnimationFrame( window.background.animate );
}

Background.prototype.drawScene = function() {
        this.tojo.drawScene();
	window.background.renderer.render( window.background.scene, window.background.camera );  //best way to render?
}

Background.prototype.renderNextFrame = function() {
	this.tojo.renderNextFrame();
	window.background.mouse.update();
	window.background.renderer.render( window.background.scene, window.background.camera );  //best way to render?
}

Background.prototype.adjustNextFrameStaging = function() {
	this.tojo.adjustNextFrameStaging();
	window.background.renderer.render( window.background.scene, window.background.camera );
}

Background.prototype.updateKeyboard = function() {
	window.background.keyboard.update();
	window.background.tojo.updateKeyboard();
	window.background.mouse.update();
}

Background.prototype.updateMouse = function() {
	window.background.mouse.rotateSpeed = 1.0;
        window.background.mouse.zoomSpeed = 1.2;
        window.background.mouse.panSpeed = 0.8;
        window.background.mouse.noZoom = false;
        window.background.mouse.noPan = false;
        window.background.mouse.staticMoving = true;
        window.background.mouse.dynamicDampingFactor = 0.3;
	window.background.mouse.addEventListener( 'change', window.background.renderNextFrame );
}

Background.prototype.onMouseMove = function( event ) {
	event.preventDefault();
	window.background.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	window.background.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	window.background.raycaster.setFromCamera( window.background.mouse, window.background.camera );

	if ( window.background.SELECTED ) {
		if ( window.background.raycaster.ray.intersectPlane( window.background.plane, window.background.intersection ) ) {
			window.background.SELECTED.position.copy( window.background.intersection.sub( window.background.offset ) );
		}
		return;
	}

	var intersects = window.background.raycaster.intersectObjects( window.background.scene.children );
	if ( intersects.length > 0 ) {
		if ( window.background.INTERSECTED != intersects[ 0 ].object ) {
			if ( window.background.INTERSECTED ) window.background.INTERSECTED.material.color.setHex( window.background.INTERSECTED.currentHex );
			window.background.INTERSECTED = intersects[ 0 ].object;
			window.background.INTERSECTED.currentHex = window.background.INTERSECTED.material.color.getHex();
			window.background.plane.setFromNormalAndCoplanarPoint(window.background.camera.getWorldDirection( window.background.plane.normal ),window.background.INTERSECTED.position );
		}
	} else {
		if ( window.background.INTERSECTED ) window.background.INTERSECTED.material.color.setHex( window.background.INTERSECTED.currentHex );
		window.background.INTERSECTED = null;
	}

	mouseX = event.clientX - windowHalfX;
	targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
}

Background.prototype.onMouseDown = function( event ) {
	event.preventDefault();
	window.background.raycaster.setFromCamera( window.background.mouse, window.background.camera );

	var intersects = window.background.raycaster.intersectObjects( window.background.scene.children );
	if ( intersects.length > 0 ) {
		window.background.mouse.enabled = false;
		window.background.SELECTED = intersects[ 0 ].object;
		if ( window.background.raycaster.ray.intersectPlane( window.background.plane, window.background.intersection ) ) {
			window.background.offset.copy( window.background.intersection ).sub( window.background.SELECTED.position );
		}
	}

	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDown = targetRotation;
}

Background.prototype.onMouseUp = function( event ) {
	event.preventDefault();
	window.background.mouse.enabled = true;
	if ( window.background.INTERSECTED ) {
		window.background.SELECTED = null;
	}
}


////////////

Background.prototype.onDocumentTouchStart = function( event ) {
    if ( ! _this.enabled ) return;

        switch ( event.touches.length ) {
            case 1:
                _state = STATE.TOUCH_ROTATE;
                _rotateStart = _rotateEnd = _this.getMouseProjectionOnBall( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
                break;
            case 2:
                _state = STATE.TOUCH_ZOOM;
                var p1 = new THREE.Vector2(event.touches[0].pageX, event.touches[0].pageY);
                var p2 = new THREE.Vector2(event.touches[1].pageX, event.touches[1].pageY);
                _touchZoomDistanceCurrent = _touchZoomDistancePrevious = p1.distanceTo(p2);
                break;
            case 3:
                _state = STATE.TOUCH_PAN;
                _panStart = _panEnd = _this.getMouseOnScreen(event.touches[0].pageX, event.touches[0].pageY);
                break;
            default:
                _state = STATE.NONE;
    }
}

Background.prototype.onDocumentTouchMove = function( event ) {
    if ( ! _this.enabled ) return;
    event.preventDefault();
    event.stopPropagation();
        switch ( event.touches.length ) {
        case 1:
            _rotateEnd = _this.getMouseProjectionOnBall( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
            break;
        case 2:
            var p1 = new THREE.Vector2(event.touches[0].pageX, event.touches[0].pageY);
            var p2 = new THREE.Vector2(event.touches[1].pageX, event.touches[1].pageY);
            _touchZoomDistanceCurrent = p1.distanceTo(p2);
            break;
        case 3:
            _panEnd = _this.getMouseOnScreen(event.touches[0].pageX, event.touches[0].pageY);
            break;
        default:
            _state = STATE.NONE;
    }
}

Background.prototype.deviceOrientation = function(e) {
	/*var alpha = e.alpha; //compass direction
	$.each(window.background.scene.children, function(i, item) {
		item.z += e.beta;
		item.x += e.gamma;
	});*/
}
