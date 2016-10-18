var tojoScript = document.getElementById("me/tojo13/App.tojo13.js");
loadScript( "me/9-App.Xtra.js", function() {  
    if( tojoScript.onLoadedCallback != null ) {
        tojoScript.onLoadedCallback.call( self );
    }        
}, function() {
    if( tojoScript.onCompletedCallback != null ) {
        App.tojo = new tojo13();
        App.tojo.load();
        tojoScript.onCompletedCallback.call( self );
    }
} );

var tojo13 = function() {

}

tojo13.prototype.load = function() {
    App.tojo.frontWall = App.Models.plane( {
        x: 0,
        y: 0,
        x: 0,
        width: 10,
        height: 10, 
        color: 0x0FF000, 
        specular: 0x0000FF,
    });
    App.scene.add( App.tojo.frontWall );

    App.tojo.rojo = App.Models.sphere( {
        x: 0, 
        y: 0, 
        z: -10, 
        color: 0xFF0000,
        uniformTopColor: 0x0F0F0F,
        uniformBottomColor: 0xF0F0F0,
    } );
	App.scene.add( App.tojo.rojo );

    App.tojo.room = App.Models.box( {
        x: 0,
        y: 0,
        z: -40,
        width: 2500,
        height: 2500,
        depth: 2500,
        color: 0xFFF00F,
    } );
    //App.scene.add( App.tojo.room );
}

tojo13.prototype.updateLights = function( delta ) {
	
}

tojo13.prototype.updateModels = function( delta ) {
    
}
  
tojo13.prototype.updateCamera = function( delta ) {
 
}