var tojoScript = document.getElementById("me/tojo13/App.tojo13.js");
loadScript( "me/App.Motion.js", function() {  
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

	//App.tojo.directionalLighting = App.Lighting.directionalLighting( 0, 10, 5, 0x00FF00, 1 );
    //App.scene.add( App.tojo.directionalLighting );
}

tojo13.prototype.updateModels = function() {
    
}
  
tojo13.prototype.updateCamera = function() {
 
}

tojo13.prototype.updateLights = function() {
	
}