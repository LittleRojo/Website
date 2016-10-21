Camera = function( fov, aspect, near, far ) {
    THREE.PerspectiveCamera.call( this, fov, aspect, near, far );
}

Camera.prototype = Object.create( THREE.PerspectiveCamera.prototype );
Camera.prototype.constructor = Camera;

Camera.prototype.load = function() {
    this.fakeCamera = new THREE.Object3D();
	this.vrCamera = new THREE.VRControls( this.fakeCamera );
}

Camera.prototype.updateFrame = function( delta ) {
    this.vrCamera.update();
}