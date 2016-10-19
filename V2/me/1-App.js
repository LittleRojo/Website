var appScript = document.getElementById("me/1-App.js");
var WebVRConfig = { 
	DEFER_INITIALIZATION: true,
	//ROTATE_INSTRUCTIONS_DISABLED: true,
 }

var polyfillScript  = loadScript( "js/webvr-polyfill.js", function() {    
    var threeScript = loadScript( "js/three.min.js", function() {
        var orbitControlsScript = loadScript( "js/OrbitControls.js", function() {
            var webVRScript = loadScript( "js/Webvr.js", function() {
                var vrControlsScript = loadScript( "js/VRControls.js", function() {
                    var vrEffectScript = loadScript( "js/VREffect.js", function() {
						var vrEffectScript = loadScript( "js/VirtualJoystick.js", function() {
							InitializeWebVRPolyfill();
							App = new App();
							App.load();				
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
} ); 

App = function() {
}

App.prototype.load = function() {
	App.renderer = new THREE.WebGLRenderer({		
		antilias: true, 
		alpha: true, 
		clearAlpha: 1
	});
	App.renderer.setPixelRatio( window.devicePixelRatio );
	App.renderer.setSize( window.innerWidth, window.innerHeight );
	App.renderer.setClearColor( 0x000000, 1 );	

	App.mainCanvas = App.renderer.domElement;
    document.body.appendChild( App.mainCanvas ); 
	
	App.scene = new THREE.Scene();
}

App.prototype.startAnimation = function() {
    if( App.stopScene ) {
        App.startScene = false;
        return;
    }
	App.updateFrame();    
    App.effect.requestAnimationFrame( App.startAnimation );	
}

App.prototype.stopAnimation = function() {
	App.stopScene = true;
}

App.prototype.updateFrame = function() {
	App.tojo.updateLights();
	App.tojo.updateModels();
	App.tojo.updateCamera();	

	//if(App.orbitControls !== undefined){
	//	App.orbitControls.update();
	//}
	//App.vrControls.update(); 

	var orbitPos = App.camera.position.clone();   
    var rotatedPosition = App.fakeCamera.position.applyQuaternion( App.camera.quaternion );
    App.camera.position.add(rotatedPosition);
    App.camera.quaternion.multiply(App.fakeCamera.quaternion);

    App.effect.render( App.scene, App.camera );
	
	App.camera.position.copy(orbitPos);
}