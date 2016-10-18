var motionScript = document.getElementById("me/App.Motion.js");
loadScript( "me/App.Lighting.js", function() {
    if( motionScript.onLoadedCallback != null ) {
        motionScript.onLoadedCallback.call( self );
    }   
}, function() {
    if( motionScript.onCompletedCallback != null ) {
        App.Motion = new Motion();
        motionScript.onCompletedCallback.call( self );    
    }
} );

Motion = function() {    
}

Motion.prototype.randomMove = function(object) {

    return object;
}