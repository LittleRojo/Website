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
    App.tojo.rojo = App.Models.sphere( {
        x: 2, 
        y: 8, 
        z: 8, 
        color: 0x00FF00,
    } );
	App.scene.add( App.tojo.rojo );

    App.tojo.ground = App.Models.plane( {
        width: 10,
        height: 10, 
        color: 0xFF0000, 
        specular: 0x0000FF,
    });
    App.scene.add( App.tojo.ground );

    //App.tojo.sky = App.Models.sky();
    //App.scene.add( App.tojo.sky );
}

tojo13.prototype.updateLights = function( delta ) {
	
}

tojo13.prototype.updateModels = function( delta ) {
    
}
  
tojo13.prototype.updateCamera = function( delta ) {
 
}