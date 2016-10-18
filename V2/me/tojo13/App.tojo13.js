var tojoScript = document.getElementById("me/tojo13/App.tojo13.js");
loadScript( "me/6-App.Music.js", function() {  
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
    App.tojo.rojo = App.Models.rojo( 2, 8, 8, 0x00FC00 );
	App.scene.add( App.tojo.rojo );
}

tojo13.prototype.updateLights = function( delta ) {
	
}

tojo13.prototype.updateModels = function( delta ) {
    
}
  
tojo13.prototype.updateCamera = function( delta ) {
 
}