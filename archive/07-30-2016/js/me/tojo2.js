function tojo2() {
	this.speed = 0.5;
        this.direction = 1;
        this.radius = 100;
        this.theta = 0.0;
        this.INTERSECTED;
}

tojo2.prototype.drawScene = function(canvasId) {
	for ( var i = 0; i < 100; i ++ ) {
		//PARTICLE SYSTEM (2D)
		/*var particle = new THREE.Sprite();
		particle.position.x = Math.random() * -1200 + 600;
		particle.position.y = Math.random() * -1200 + 600;
		particle.position.z = Math.random() * -1200 + 600;
		particle.scale.x = -80;
		particle.scale.y = -80;
		particle.material.color = new THREE.Color(0xffffff * Math.random());
		window.background.scene.add( particle );*/

		//3D CUBE
		/*var geometry = new THREE.CubeGeometry( 70, 70, 70);
		var material = new THREE.MeshPhongMaterial( {  specular: 0x555555 } );
		material.color = new THREE.Color(0xffffff * Math.random());  

    		mesh = new THREE.Mesh(geometry, material );
		mesh.position.x = Math.random() * -1200 + 600;
                mesh.position.y = Math.random() * -1200 + 600;
                mesh.position.z = Math.random() * -1200 + 600;

		window.background.scene.add( mesh );*/

		//POLKA DOTS 2D
		/*var material = new THREE.MeshBasicMaterial({
    			color: new THREE.Color(0xffffff * Math.random())
		});

		var radius = 50;
		var segments = 32; //<-- Increase or decrease for more resolution I guess

		var circleGeometry = new THREE.CircleGeometry( radius, segments );              
		var circle = new THREE.Mesh( circleGeometry, material );
		circle.position.x = Math.random() * -1200 + 600;
                circle.position.y = Math.random() * -1200 + 600;
                circle.position.z = Math.random() * -1200 + 600;

		window.background.scene.add(circle);*/

		//SPHERE 3D
		var geometry = new THREE.SphereGeometry(23, 10, 10, 0, Math.PI * 2, 0, Math.PI * 2);
		var material = new THREE.MeshNormalMaterial();
		material.color = new THREE.Color(0xffffff * Math.random());

		var sphere = new THREE.Mesh(geometry, material);

		sphere.position.x = Math.random() * -1200 + 600;
                sphere.position.y = Math.random() * -1200 + 600;
                sphere.position.z = Math.random() * -1200 + 600;

		window.background.scene.add(sphere);
	}

	window.background.scene.add( new THREE.AmbientLight( 0xffffff ));

	this.light = new THREE.DirectionalLight( 0xffffff );
    	//LIGHT 1
	/*this.light.position.set( 0, 1, 1 ).normalize();
	window.background.scene.add(this.light);*/

	//LIGHT 2
	this.light.position.set(0, 2, 2);
	this.light.target.position.set(0, 0, 0);
	this.light.castShadow = true;
	this.light.shadowDarkness = 0.5;
	this.light.shadowCameraVisible = true; // only for debugging
	// these six values define the boundaries of the yellow box seen above
	this.light.shadowCameraNear = 2;
	this.light.shadowCameraFar = 5;
	this.light.shadowCameraLeft = -0.5;
	this.light.shadowCameraRight = 0.5;
	this.light.shadowCameraTop = 0.5;
	this.light.shadowCameraBottom = -0.5;
    	window.background.scene.add(this.light);

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
        }
}
