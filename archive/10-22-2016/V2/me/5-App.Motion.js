var motionScript = document.getElementById("me/5-App.Motion.js");
loadScript( "me/4-App.Models.js", function() {
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
}

Motion.prototype.MoveX = function(object, units) {
}

Motion.prototype.MoveY = function(object, units) {
}

Motion.prototype.MoveZ = function(object, units) {
}