var controlScript = document.getElementById("me/6-App.Controls.js");
loadScript( "me/5-App.Motion.js", function() {
    if( controlScript.onLoadedCallback != null ) {
        controlScript.onLoadedCallback.call( self );
    }   
}, function() {
    if( controlScript.onCompletedCallback != null ) {
        App.Controls = new Controls();
        App.Controls.load();
        controlScript.onCompletedCallback.call( self );    
    }
} );

Controls = function() {
}

Controls.prototype.load = function() {
    //CAMERA
    App.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000000 );
	App.camera.position.set( 0, 0, 10 );

    //MOUSE, KEYBOARD, AND DEVICE ORIENTATION
    //App.orbitControls = new THREE.OrbitControls( App.camera );
  	//App.orbitControls.zoomSpeed = 1;
	//App.orbitControls.rotateSpeed = 1;
	//App.orbitControls.keyPanSpeed = 1;

    //JOYSTICKS
    var offset = 70;    
	App.leftJoystick	= new VirtualJoystick({
		container	: document.body,
		strokeStyle	: 'cyan',
		limitStickTravel: true,
		stickRadius	: 120,
        mouseSupport: true,	
        //stickElement: new stick canvas,
        //baseElement: new base canvas,
        stationaryBase: true,
        baseX: offset,
        baseY: window.innerHeight - offset,        	
	});
	App.leftJoystick.addEventListener('touchStartValidation', function(event){
		var touch	= event.changedTouches[0];
		if( touch.pageX >= window.innerWidth/2 )	return false;
		return true
	});
    App.leftJoystick.addEventListener('touchStart', function(){
		console.log('right')
	})
    
	App.rightJoystick	= new VirtualJoystick({
		container	: document.body,
		strokeStyle	: 'brown',
		limitStickTravel: true,
		stickRadius	: 120,
        mouseSupport: true,	
        //stickElement: new stick canvas,
        //baseElement: new base canvas,
        stationaryBase: true,
        baseX: window.innerWidth - offset,
        baseY: window.innerHeight - offset,	
	});
	App.rightJoystick.addEventListener('touchStartValidation', function(event){
		var touch	= event.changedTouches[0];
		if( touch.pageX < window.innerWidth/2 )	return false;
		return true
	});
	App.rightJoystick.addEventListener('touchStart', function(){
		console.log('right')
	})

    //VR
    App.fakeCamera = new THREE.Object3D();
	App.vrControls = new THREE.VRControls( App.fakeCamera );
	App.effect = new THREE.VREffect( App.renderer );

	if ( WEBVR.isAvailable() === true ) {
		document.body.appendChild( WEBVR.getButton( App.effect ) );
	}
    
    //DEVICE ORIENTATION
    App.resize = function() { 
		App.renderer.setSize( window.innerWidth, window.innerHeight );
		App.camera.aspect = window.innerWidth / window.innerHeight;
		App.camera.updateProjectionMatrix();	

		if( ( "standalone" in window.navigator ) && window.navigator.standalone ) {
			//IPHONE ORIENTATION - PROFILE
			if( window.orientation === 90 || window.orientation === -90 ) {	
			}

			//IPHONE ORIANTATION - LANDSCAPE
			else {
			} 		
		}
		else {	
		}
		App.renderer.render( App.scene, App.camera );
	}
	window.addEventListener( 'resize', App.resize, false);

    if( ( navigator.userAgent.match( /iPhone/i ) ) || ( navigator.userAgent.match( /iPod/i )  ) ) {		
		//IPHONE ORIENTATION - PROFILE
		if( window.orientation === 90 || window.orientation === -90 ) {
		}

		//IPHONE ORIANTATION - LANDSCAPE
		else {  		
		}
	}

	//WEB APP LINKING	
	if( ( "standalone" in window.navigator ) && window.navigator.standalone ) {
		//IPHONE ORIENTATION - PROFILE
		if( window.orientation === 90 || window.orientation === -90 ) {				
		}

		//IPHONE ORIANTATION - LANDSCAPE
		else {
		} 	    
	}
	else {	
	}
}

Controls.prototype.onLeftJoystickMove = function(url) {
}

Controls.prototype.onRightJoystickMove = function(song) {
}