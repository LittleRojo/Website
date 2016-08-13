function tojo2() {
	this.speed = 0.5;
        this.direction = 1;
        this.radius = 100;
        this.theta = 0.0;
        this.INTERSECTED;
}

tojo2.prototype.drawScene = function(canvasId) {
	for ( var i = 0; i < 50; i ++ ) {
		var particle = new THREE.Sprite();
		particle.position.x = Math.random() * 1200 - 600;
		particle.position.y = Math.random() * 1200 - 600;
		particle.position.z = Math.random() * 1200 - 600;
		particle.scale.x = 80;
		particle.scale.y = 80;
		//particle.material.map = THREE.ImageUtils.loadTexture('/img/LittleRojoLogo.png');
		window.background.scene.add( particle );
	}
	window.background.renderer.render( window.background.scene, window.background.camera );
}

tojo2.prototype.renderNextFrame = function() {

}

tojo2.prototype.adjustNextFrameStaging = function() {
	if(this.direction == 1) {
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
        }
}
