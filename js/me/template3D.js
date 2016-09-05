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

function Template3D(canvas) {	
	this.renderer = new THREE.WebGLRenderer({ canvas:canvas, antilias: true, alpha: true, clearAlpha: 1});	
    this.renderer.setSize( window.innerWidth, window.innerHeight );
	this.renderer.shadowMap.enabled = true;
	this.renderer.shadowMap.type = THREE.PCFShadowMap;

    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / (window.innerHeight), 9, 5900 );
    this.camera.position.set( 0, -2000, 5000 );
    this.scene = new THREE.Scene();

    this.raycaster = new THREE.Raycaster();
	this.keyboard = new THREEx.KeyboardState();
	//this.mouse = new THREE.TrackballControls( this.camera );
	this.projector = new THREE.Projector();
	if ("geolocation" in navigator) {
		this.gps = 1;
	} 
	else {
		this.gps = 0;
	}

	this.offset = new THREE.Vector3(),
	this.intersection = new THREE.Vector3(),
	this.plane = new THREE.Plane();

	/*return {
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
		rojo:this.rojo,
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
	};*/
}

Template3D.prototype.animate = function() {
        this.renderNextFrame();
        this.adjustNextFrameStaging();
		this.updateKeyboard();
        requestAnimationFrame( this.animate );
}

Template3D.prototype.drawScene = function() {
	//this.rojo.GO();
        /*mapboxgl.accessToken = 'pk.eyJ1IjoibGl0dGxlcm9qbyIsImEiOiJjaXJpbmNmazYwMDBiZmduYnJwcHE3bTFyIn0.QElYybeFCSAo-q4gRLq6cA';
        var bounds = [
                [143,90],
                [-140,10]];
        var map = new mapboxgl.Map ({
                trackResize: true,
                dragRotate: false,
                //minZoom: 1.2,
                //dragPan: false,
                //maxBounds: [[ 144, 90 ],[ -140, 10]],
                //center: [7, 32],
                container: 'map',
                style: 'mapbox://styles/littlerojo/ciripj1kq0003gjns0tvtqvb4'
        });*/	
        this.tojo.drawScene();
	window.Template3D.renderer.render( window.Template3D.scene, window.Template3D.camera );  //best way to render?
}

Template3D.prototype.renderNextFrame = function() {
	this.tojo.renderNextFrame();
	//window.Template3D.mouse.update();
	window.Template3D.renderer.render( window.Template3D.scene, window.Template3D.camera );  //best way to render?
}

Template3D.prototype.adjustNextFrameStaging = function() {
	this.tojo.adjustNextFrameStaging();
	window.Template3D.renderer.render( window.Template3D.scene, window.Template3D.camera );
}

Template3D.prototype.updateKeyboard = function() {
	window.Template3D.keyboard.update();
	window.Template3D.tojo.updateKeyboard();
	//window.Template3D.mouse.update();
}

Template3D.prototype.updateMouse = function() {
	window.Template3D.mouse.rotateSpeed = 1.0;
        window.Template3D.mouse.zoomSpeed = 1.2;
        window.Template3D.mouse.panSpeed = 0.8;
        window.Template3D.mouse.noZoom = false;
        window.Template3D.mouse.noPan = false;
        window.Template3D.mouse.staticMoving = true;
        window.Template3D.mouse.dynamicDampingFactor = 0.3;
	window.Template3D.mouse.addEventListener( 'change', window.Template3D.renderNextFrame );
}

Template3D.prototype.onMouseMove = function( event ) {
	return;
	event.preventDefault();
	if(window.Template3D != null) {
		window.Template3D.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		window.Template3D.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		window.Template3D.raycaster.setFromCamera( window.Template3D.mouse, window.Template3D.camera );
	
		if ( window.Template3D.SELECTED ) {
			if ( window.Template3D.raycaster.ray.intersectPlane( window.Template3D.plane, window.Template3D.intersection ) ) {
				window.Template3D.SELECTED.position.copy( window.Template3D.intersection.sub( window.Template3D.offset ) );
			}
			return;
		}

		var intersects = window.Template3D.raycaster.intersectObjects( window.Template3D.scene.children );
		if ( intersects.length > 0 ) {
			if ( window.Template3D.INTERSECTED != intersects[ 0 ].object ) {
				if ( window.Template3D.INTERSECTED ) window.Template3D.INTERSECTED.material.color.setHex( window.Template3D.INTERSECTED.currentHex );
				window.Template3D.INTERSECTED = intersects[ 0 ].object;
				window.Template3D.INTERSECTED.currentHex = window.Template3D.INTERSECTED.material.color.getHex();
				window.Template3D.plane.setFromNormalAndCoplanarPoint(window.Template3D.camera.getWorldDirection( window.Template3D.plane.normal ),window.Template3D.INTERSECTED.position );
			}
		} else {
			if ( window.Template3D.INTERSECTED ) window.Template3D.INTERSECTED.material.color.setHex( window.Template3D.INTERSECTED.currentHex );
			window.Template3D.INTERSECTED = null;
		}
	}

	mouseX = event.clientX - windowHalfX;
	targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
}

Template3D.prototype.onMouseDown = function( event ) {
	return;
	event.preventDefault();
	window.Template3D.raycaster.setFromCamera( window.Template3D.mouse, window.Template3D.camera );

	var intersects = window.Template3D.raycaster.intersectObjects( window.Template3D.scene.children );
	if ( intersects.length > 0 ) {
		window.Template3D.mouse.enabled = false;
		window.Template3D.SELECTED = intersects[ 0 ].object;
		if ( window.Template3D.raycaster.ray.intersectPlane( window.Template3D.plane, window.Template3D.intersection ) ) {
			window.Template3D.offset.copy( window.Template3D.intersection ).sub( window.Template3D.SELECTED.position );
		}
	}

	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDown = targetRotation;
}

Template3D.prototype.onMouseUp = function( event ) {
	return;
	event.preventDefault();
	window.Template3D.mouse.enabled = true;
	if ( window.Template3D.INTERSECTED ) {
		window.Template3D.SELECTED = null;
	}
}


////////////

Template3D.prototype.onDocumentTouchStart = function( event ) {
	return;
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

Template3D.prototype.onDocumentTouchMove = function( event ) {
	return;
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

Template3D.prototype.deviceOrientation = function(e) {
	/*var alpha = e.alpha; //compass direction
	$.each(window.Template3D.scene.children, function(i, item) {
		item.z += e.beta;
		item.x += e.gamma;
	});*/
}
