function tojo3() {
	this.speed = 0.5;
        this.direction = 1;
        this.radius = 100;
        this.theta = 0.0;
        this.INTERSECTED;
	this.z = -400;
}

function jsonFlickrFeed(json) {
  	$.each(json.items, function(i, item) {
		/*var particle = new THREE.Sprite();
		particle.position.x = Math.floor(Math.random() * 200);
		particle.position.y = Math.floor(Math.random() * 200);  
		particle.position.x -= 100;
		particle.position.y += 200;
		particle.position.z = -400 * i;
		//particle.position.z -= 300;
		particle.scale.x = 80;
		particle.scale.y = 80;
		particle.material.map = THREE.ImageUtils.loadTexture(item.media.m);
		window.background.scene.add( particle );*/

	  	var geometry = new THREE.PlaneGeometry( 70, 70, 70);
                var material = new THREE.MeshPhongMaterial( { transperant: true } );
                //material.color = new THREE.Color(0xffffff * Math.random());
		var material = new THREE.MeshBasicMaterial();
		material.map = THREE.ImageUtils.loadTexture(item.media.m)
               	mesh = new THREE.Mesh(geometry, material );
               	mesh.position.x = Math.floor(Math.random() * 200);
		mesh.position.x -= 100;
               	mesh.position.y = Math.floor(Math.random() * 200);
		mesh.position.y +=200;
               	mesh.position.z = -400 * i;
               	window.background.scene.add( mesh );

		/*$.ajax({
    		url: 'https://api.flickr.com/services/feeds/photos_public.gne',
    		dataType: 'jsonp',
    		data: { "tags": item.tags, "format": "json" }*/
  	});
};

tojo3.prototype.drawScene = function(canvasId) {
	$.ajax({
    		url: 'https://api.flickr.com/services/feeds/photos_public.gne',
    		dataType: 'jsonp',
    		data: { "tags": "rio olympics", "format": "json" }
  	});

	$.ajax({
		url: 'https://api.flickr.com/services/feeds/photos_public.gne',
		dataType: 'jsonp',
		data: { "tags": "Track and Field", "format": "json" }
	});

	for(var i = 0; i < 100; i++) {
		/*var particle = new THREE.Sprite();
		particle.position.x = Math.floor(Math.random() * 200);
		particle.position.y = Math.floor(Math.random() * 200);  
		particle.position.x -= 100;
		particle.position.y += 200;
		particle.position.z = -20 * i;
		particle.position.z -= 300;
		particle.scale.x = 80;
		particle.scale.y = 80;
		particle.material.map = THREE.ImageUtils.loadTexture('img/LittleRojoLogo.png');
		window.background.scene.add( particle );*/
		
		//3D CUBE
                /*var geometry = new THREE.CubeGeometry( 70, 70, 70);
                var material = new THREE.MeshPhongMaterial( { transperant: true } );
                material.color = new THREE.Color(0xffffff * Math.random());
  			var material = new THREE.MeshBasicMaterial();
			material.map = THREE.ImageUtils.loadTexture('img/LittleRojoLogo.png')
                	mesh = new THREE.Mesh(geometry, material );
                	mesh.position.x = 0;//Math.random() * 100;
                	mesh.position.y = 350;//Math.random() * 100;
                	mesh.position.z = -600 * i;
                	window.background.scene.add( mesh );*/
	}

	window.background.scene.add( new THREE.AmbientLight( 0xffffff ));

	this.light = new THREE.DirectionalLight( 0xffffff );
    	//LIGHT 1
	/*this.light.position.set( 0, 1, 1 ).normalize();
	window.background.scene.add(this.light);*/

	//LIGHT 2
	/*this.light.position.set(0, 2, 2);
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
    	window.background.scene.add(this.light);*/

	window.background.renderer.render( window.background.scene, window.background.camera );
}

tojo3.prototype.renderNextFrame = function() {
	for(var i=0; i<window.background.scene.children.length; i++) {		
		window.background.scene.children[i].translateZ(2);
		if(window.background.scene.children[i].position.z > 100 && window.background.scene.children[i].type != "AmbientLight") {
			window.background.scene.children[i].material.opacity = (1000 - window.background.scene.children[i].material.opacity) / 1000;
		}
		//window.background.scene.children[i].material.opacity = Math.random();;
	}	
}

tojo3.prototype.adjustNextFrameStaging = function() {
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
