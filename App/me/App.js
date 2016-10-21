var App = App || { };

App.event = {
    addListener: function(el, type, fn) {
    },
    removeListener: function(el, type, fn) {
    },
    getEvent: function(e) {
    }
}

App.camera = new Camera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
App.renderer = new Renderer();
App.scene = new Scene();

App.mainCanvas = App.renderer.domElement;
document.body.appendChild( App.mainCanvas ); 

App.startAnimation = function() {
    if( App.stopScene ) {
        App.startScene = false;
        return;
    }
	
	App.updateFrame();  
	App.render();

    App.effect.requestAnimationFrame( App.startAnimation );	
}

App.stopAnimation = function() {
	App.stopScene = true;
}

App.updateFrame = function() {
	var delta = App.clock.getDelta();
	App.updateLights( delta );
	App.updateModels( delta );
	App.updateCamera( delta );	

	App.vrControls.update();

	App.orbitPos = App.camera.position.clone();   
	App.orbitRot = App.camera.rotation.clone();
    var rotatedPosition = App.fakeCamera.position.applyQuaternion( App.camera.quaternion );
    App.camera.position.add(rotatedPosition);
    App.camera.quaternion.multiply(App.fakeCamera.quaternion);
}

App.render = function() {
    App.effect.render( App.scene, App.camera );
	
	App.camera.position.copy(App.orbitPos);
	App.camera.rotation.copy(App.orbitRot);
}