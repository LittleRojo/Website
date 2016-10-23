var xtraScript = document.getElementById("me/9-App.Xtra.js");
loadScript( "me/7-App.Music.js", function() {
    if( xtraScript.onLoadedCallback != null ) {
        xtraScript.onLoadedCallback.call( self );
    }   
}, function() {
    if( xtraScript.onCompletedCallback != null ) {
        App.Xtra = new Xtra();
        App.Xtra.load();
        xtraScript.onCompletedCallback.call( self );    
    }
} );

Xtra = function() {
}

Xtra.prototype.load = function() {
    App.clock = new THREE.Clock();

    App.sightLine = new THREE.Object3D();
    App.sightLine.position.set( 0, 0, 0 );

    App.displayMode = 0; 
}