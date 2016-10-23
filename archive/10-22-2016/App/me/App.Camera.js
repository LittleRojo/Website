Camera = function( fov, aspect, near, far ) {
    THREE.PerspectiveCamera.call( this, fov, aspect, near, far );
}

Camera.prototype = Object.create( THREE.PerspectiveCamera.prototype );
Camera.prototype.constructor = Camera;

Camera.prototype.load = function() {
    this.aspect = window.innerWidth / window.innerHeight;
    this.updateProjectionMatrix();    
    this.orbitControls = new THREE.OrbitControls(this);
}