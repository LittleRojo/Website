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
	App.camera.position.set( 0, 5, 10 );

    //JOYSTICKS
    App.leftJoystickColor = 'cyan';
    App.rightJoystickColor = 'gray';
    var offset = 90;    
	App.leftJoystick	= new VirtualJoystick({
		container	: document.body,
		strokeStyle	: App.leftJoystickColor,
		limitStickTravel: true,
		stickRadius	: 58,
        mouseSupport: true,	
        //stickElement: new stick App.Controls.vrButtonCanvas,
        //baseElement: new base App.Controls.vrButtonCanvas,
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
        //stickElement: new stick App.Controls.vrButtonCanvas,
        //baseElement: new base App.Controls.vrButtonCanvas,
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
	})
    
    //VR
    App.fakeCamera = new THREE.Object3D();
	App.vrControls = new THREE.VRControls( App.fakeCamera );
	App.effect = new THREE.VREffect( App.renderer );
	App.Controls.createButton( App.effect );

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

Controls.prototype.createButton = function( effect ) {
    var renderer = new THREE.WebGLRenderer({		
		antilias: true, 
		alpha: true, 
		clearAlpha: 1
	});
    renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( 63, 44 );
	renderer.setClearColor( 0x000000, 0 );	
	
	var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, 63 / 44 , 0.1, 1000 );
	camera.position.set( 0, 5, 10 );

    var loader = new THREE.TextureLoader();
    var light = new THREE.AmbientLight( 0xF000FF, .5 );
    scene.add( light );

    var vrLogo = App.Models.plane( {
        x: 0,
        y: 0,
        z: 0,
        width: 12,
        height: 25,
        color: 0x000000,
        //texture: loader.load('img/vrLogoIcon.png'),
    } ); 
    scene.add( vrLogo ); 

    App.Controls.vrButtonCanvas = renderer.domElement;
    App.Controls.vrButtonCanvas.id = 'vrButtonCanvas';
    App.Controls.vrButtonCanvas.style.position = 'absolute';
    App.Controls.vrButtonCanvas.style.left = 'calc(50% - 33px)';
    App.Controls.vrButtonCanvas.style.bottom = '20px';
    App.Controls.vrButtonCanvas.style.width = '63px';
    App.Controls.vrButtonCanvas.style.height = '44px';
    App.Controls.vrButtonCanvas.style.border = '0';
    App.Controls.vrButtonCanvas.style.padding = '0px';
    App.Controls.vrButtonCanvas.style.cursor = 'pointer';
    //App.Controls.vrButtonCanvas.onclick = function() {
    //    effect.isPresenting ? effect.exitPresent() : effect.requestPresent();
    //};

    window.addEventListener( 'vrdisplaypresentchange', function ( event ) {
        App.Controls.vrButtonCanvas.textContent = effect.isPresenting ? 'FLAT' : 'VR';
    }, false );

    document.body.appendChild( App.Controls.vrButtonCanvas );
    renderer.render( scene, camera );
}