var tojoScript = document.getElementById("me/tojo13/tojo13.js");
loadScript( "me/App.Models.js", function() {        
        if( tojoScript.onLoadedCallback != null ) {
            tojoScript.onLoadedCallback.call( self );
        }        
    }, function() {
    if( tojoScript.onCompletedCallback != null ) {
        App.tojo = new tojo13();
        tojoScript.onCompletedCallback.call( self );
    }
} ); 

var tojo13 = function() {

}

tojo13.prototype.createModels = function() {
    App.tojo.rojo = App.Models.rojo();
	App.scene.add( App.tojo.rojo );

	//App.ambientLight = App.Models.ambientLight( 0, 0, 0, 0x000000, 1 );    
	//App.scene.add( App.ambientLight );
    //this.orbitPos = App.camera.position.clone();
}

tojo13.prototype.updateModels = function() {
    
}
  
tojo13.prototype.updateCamera = function() {
 
}

tojo13.prototype.updateLights = function() {
	
}

tojo13.prototype.updateControls = function() {
    App.orbitControls.update();
    App.vrControls.update();
    
    var rotatedPosition = App.fakeCamera.position.applyQuaternion( App.camera.quaternion );
    App.camera.position.add(rotatedPosition);
    App.camera.quaternion.multiply(App.fakeCamera.quaternion);
}