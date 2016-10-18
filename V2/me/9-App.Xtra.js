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

Xtra.prototpye.load = function() {
    App.mainCanvas = App.renderer.domElement;
    document.body.appendChild( App.mainCanvas );   
         
    App.clock = new THREE.Clock();
}