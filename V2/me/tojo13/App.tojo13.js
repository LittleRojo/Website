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
    App.tojo.frontWall = App.Models.plane( {
        width: 10,
        height: 10, 
        color: 0xFF0000, 
        specular: 0x0000FF,
    });
    //App.scene.add( App.tojo.frontWall );

    App.tojo.rojo = App.Models.sphere( {
        x: 0, 
        y: 0, 
        z: 0, 
        color: 0xFF0000,
    } );
	App.scene.add( App.tojo.rojo );

    App.tojo.room = App.Models.box( {
        x: 0,
        y: 0,
        z: -40,
        width: 25,
        height: 25,
        depth: 25,
        color: 0xFFF00F,
    } );
    App.scene.add( App.tojo.room );
}

tojo13.prototype.updateLights = function( delta ) {
	
}

tojo13.prototype.updateModels = function( delta ) {
    
}
  
tojo13.prototype.updateCamera = function( delta ) {
 
}