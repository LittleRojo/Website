var appScript = document.getElementById("me/App.js");
var WebVRConfig = { DEFER_INITIALIZATION: true }
var polyfillScript  = loadScript( "js/webvr-polyfill.js", function() {    
    var threeScript = loadScript( "js/three.min.js", function() {
        var orbitControlsScript = loadScript( "js/OrbitControls.js", function() {
            var webVRScript = loadScript( "js/Webvr.js", function() {
                var vrControlsScript = loadScript( "js/VRControls.js", function() {
                    var vrEffectScript = loadScript( "js/VREffect.js", function() {
						InitializeWebVRPolyfill();
						App = new App();						
						if( appScript.onLoadedCallback != null ) {
							appScript.onLoadedCallback.call( self );							
						}
						if( appScript.onCompletedCallback != null ) {
							appScript.onCompletedCallback.call( self );
						}						
					} );   
				} );                    
			} );
		} );
	} );
} ); 

App = function() {
}

App.prototype.load = function() {
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

App.prototype.runApp = function() {
	App.createApp();
	App.tojo.createModels();
	App.animate();
}

App.prototype.createApp = function(fileName) {
	App.renderer = new THREE.WebGLRenderer({		
		antilias: true, 
		alpha: true, 
		clearAlpha: 1
	});
	App.renderer.setPixelRatio( window.devicePixelRatio );
	App.renderer.setSize( window.innerWidth, window.innerHeight );
	App.renderer.setClearColor( 0x000000, 1 );
	//App.renderer.shadowMap.enabled = true;
	//App.renderer.shadowMap.renderReverseSided = false;
	//App.renderer.sortObjects = false;

	App.mainCanvas = App.renderer.domElement;
	document.body.appendChild( App.mainCanvas );
	
	App.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000000 );
	App.camera.position.set( 0, 0, 10 );

	App.orbitControls = new THREE.OrbitControls( App.camera ) ;
	//App.orbitControls.zoomSpeed = .1;
	//App.orbitControls.rotateSpeed = .001;
	//App.orbitControls.keyPanSpeed = .001;

	App.fakeCamera = new THREE.Object3D();
	App.vrControls = new THREE.VRControls( App.fakeCamera );

	App.effect = new THREE.VREffect( App.renderer );

	if ( WEBVR.isAvailable() === true ) {
		document.body.appendChild( WEBVR.getButton( App.effect ) );
	}

	App.scene = new THREE.Scene();
	App.clock = new THREE.Clock();

	window.addEventListener( 'resize', function() { 
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
	}, false);

	App.effect.render( App.scene, App.camera );
}

App.prototype.updateFrame = function() {
	App.tojo.updateModels();
	App.tojo.updateCamera();
	App.tojo.updateLights();
	App.tojo.updateControls();

    App.effect.render( App.scene, App.camera );
}

App.prototype.animate = function( delta ) {
    if( App.stopScene ) {
        App.startScene = false;
        return;
    }    
    App.effect.requestAnimationFrame( App.animate );
	App.updateFrame();
}

App.prototype.stopAnimation = function() {
	App.stopScene = true;
}