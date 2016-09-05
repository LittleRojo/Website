function rojo() {
}

rojo.prototype.GO = function(canvasId) {
	for ( var i = 0; i < 5; i ++ ) {
		//SPHERE 3D
		var geometry = new THREE.SphereGeometry(2*i, 2*i, 2*i);
		var material = new THREE.MeshNormalMaterial({ color: 0x0F0F0F });
		var sphere = new THREE.Mesh(geometry, material);
		sphere.position.x = 0;
                sphere.position.y = 0;
                sphere.position.z = 0;
		window.background.scene.add(sphere);
	}

	window.background.renderer.render( window.background.scene, window.background.camera );
}

rojo.prototype.renderNextFrame = function() {
}

rojo.prototype.adjustNextFrameStaging = function() {
	/*if(this.direction == 1) {
                this.speed += .005;
        }
        else {
                this.speed -= .005;
        }
        if(this.speed > 1) {
                this.direction = 0;
        }
        else if(this.speed < .5) {
                this.direction = 1;
        }

        this.theta += this.speed;
        window.background.camera.position.x = this.radius * Math.cos( THREE.Math.degToRad( this.theta ) );
        window.background.camera.position.y = this.radius * Math.cos( THREE.Math.degToRad( this.theta ) );
        window.background.camera.position.z = this.radius * Math.sin( THREE.Math.degToRad( this.theta ) );
        window.background.camera.lookAt( window.background.scene.position );
        window.background.camera.updateMatrixWorld();

	this.light.position.x = this.radius * Math.cos( THREE.Math.degToRad( this.theta ) );
        this.light.position.y = this.radius * Math.cos( THREE.Math.degToRad( this.theta ) );
        this.light.position.z = this.radius * Math.sin( THREE.Math.degToRad( this.theta ) );
        this.light.lookAt( window.background.scene.position );
        this.light.updateMatrixWorld();

        window.background.raycaster.setFromCamera( window.background.mouse, window.background.camera );
        var intersects = window.background.raycaster.intersectObjects( window.background.scene.children );

        if ( intersects.length > 0 ) {
                if ( this.INTERSECTED != intersects[ 0 ].object ) {
                        if ( this.INTERSECTED ) this.INTERSECTED.material.program = this.programStroke;
                        this.INTERSECTED = intersects[ 0 ].object;
                        this.INTERSECTED.material.program = this.programFill;
                }
        } else {
                if ( this.INTERSECTED ) this.INTERSECTED.material.program = this.programStroke;
                this.INTERSECTED = null;
        }*/
}

rojo.prototype.updateKeyboard = function() {

}

rojo.prototype.onMouseDown = function() {

}

rojo.prototype.onMouseMove = function() {

}

rojo.prototype.onMouseUp = function() {

}
