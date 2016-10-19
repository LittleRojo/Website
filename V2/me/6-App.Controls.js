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
    App.orbitControls = new THREE.OrbitControls( App.camera );
  	App.orbitControls.zoomSpeed = 0;
	App.orbitControls.rotateSpeed = 0;
	App.orbitControls.keyPanSpeed = 0;

    //JOYSTICKS
    /*App.leftJoystickColor = 'cyan';
    App.rightJoystickColor = 'gray';
    var offset = 90;    
	App.leftJoystick	= new VirtualJoystick({
		container	: document.body,
		strokeStyle	: App.leftJoystickColor,
		limitStickTravel: true,
		stickRadius	: 58,
        mouseSupport: true,	
        //stickElement: new stick canvas,
        //baseElement: new base canvas,
        stationaryBase: true,
        baseX: offset,
        baseY: window.innerHeight - offset,   
        joystickType: "left",
        joystickBoundary: 50,
        
	});
	App.leftJoystick.addEventListener('touchStartValidation', function(event){
		var touch	= event.changedTouches[0];
		if( touch.pageX >= window.innerWidth/2 )	return false;
		return true
	});
    
	App.rightJoystick	= new VirtualJoystick({
		container	: document.body,
		strokeStyle	: App.rightJoystickColor,
		limitStickTravel: true,
		stickRadius	: 58,
        mouseSupport: true,	
        //stickElement: new stick canvas,
        //baseElement: new base canvas,
        stationaryBase: true,
        baseX: window.innerWidth - offset,
        baseY: window.innerHeight - offset,	
        joystickType: "right",
        joystickBoundary: 50,
	});
	App.rightJoystick.addEventListener('touchStartValidation', function(event){
		var touch	= event.changedTouches[0];
		if( touch.pageX < window.innerWidth/2 )	return false;
		return true
	});
	App.rightJoystick.addEventListener('touchStart', function(){
		console.log('right')
	})*/
    
    //VR
    App.fakeCamera = new THREE.Object3D();
	App.vrControls = new THREE.VRControls( App.fakeCamera );
	App.effect = new THREE.VREffect( App.renderer );

	if ( WEBVR.isAvailable() === true ) {
		document.body.appendChild( App.Controls.getButton( App.effect ) );
	}

    //DEVICE ORIENTATION
    App.resize = function() { 
		App.renderer.setSize( window.innerWidth, window.innerHeight );
		App.camera.aspect = window.innerWidth / window.innerHeight;
		App.camera.updateProjectionMatrix();	

		if( ( "standalone" in window.navigator ) && window.navigator.standalone ) {
			//IPHONE ORIENTATION - PROFILE
			if( window.orientation === 90 || window.orientation === -90 ) {	
                App.leftJoystick._baseEl.style.left = 7;
                App.leftJoystick._baseEl.style.top = window.innerHeight - 70;

                App.rightJoystick._baseEl.style.left = window.innerWidth - 133;
                App.rightJoystick._baseEl.style.top = window.innerHeight - 70;
			}

			//IPHONE ORIANTATION - LANDSCAPE
			else {
                App.leftJoystick._baseEl.style.left = 25;
                App.leftJoystick._baseEl.style.top = window.innerHeight - 160;

                App.rightJoystick._baseEl.style.left = window.innerWidth - 153;
                App.rightJoystick._baseEl.style.top = window.innerHeight - 160;
			} 		
		}
		else {	
            App.leftJoystick._baseEl.style.left = 7;
            App.leftJoystick._baseEl.style.bottom = window.innerHeight - 70;

            App.rightJoystick._baseEl.style.left = window.innerWidth - 133;
            App.rightJoystick._baseEl.style.bottom = window.innerHeight - 70;
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

Controls.prototype.getButton = function( effect ) {
    var button = document.createElement( 'button' );
    button.style.position = 'absolute';
    button.style.left = 'calc(50% - 40px)';
    button.style.bottom = '20px';
    button.style.width = '63px';
    button.style.height = '44px';
    button.style.border = '0';
    button.style.padding = '8px';
    button.style.cursor = 'pointer';
    button.style.backgroundColor = '#000';
    button.style.color = '#fff';
    button.style.fontFamily = 'sans-serif';
    button.style.fontSize = '13px';
    button.style.fontStyle = 'normal';
    button.style.textAlign = 'center';
    button.style.zIndex = '999';
    button.textContent = 'VR';
    button.style.backgroundImage = 'url(img/vrLogoIcon.png)';
    button.onclick = function() {
        effect.isPresenting ? effect.exitPresent() : effect.requestPresent();
    };

    window.addEventListener( 'vrdisplaypresentchange', function ( event ) {
        button.textContent = effect.isPresenting ? 'FLAT' : 'VR';
    }, false );

    return button;
}

Controls.prototype.onRightJoystickMove = function(song) {
}