Scene = function() {    
    THREE.Scene.call( this );
}

Scene.prototype = Object.create( THREE.Scene.prototype );
Scene.prototype.constructor = Scene;