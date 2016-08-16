function tojo5() {
	this.speed = 0.5;
        this.direction = 1;
        this.radius = 500;
        this.theta = 0.0;
        this.INTERSECTED;
	this.x = 0;
	this.xDir = 0;
	this.y = 0;
	this.yDir = 0;
	this.z = 0;
	this.zDir = 0;
	this.itteration = 0;
}

tojo5.prototype.drawScene = function(canvasId) {
	for(var a = 1; a < 100; a++) {
		$.get("index.html", function(data) {
                        html2canvas(data, {
                                 function(canvas) {
					var particle = new THREE.Sprite();
			                particle.position.x = Math.random() * -1200 + 600;
			                particle.position.y = Math.random() * -1200 + 600;
			                particle.position.z = Math.random() * -1200 + 600;
			                particle.scale.x = -180;
			                particle.scale.y = -180;
        		        	particle.material.map = THREE.ImageUtils.loadTexture(item.media);
			                window.background.scene.add( particle );

                                        //var img = canvas.toDataURL("image/png")
                                        //particle.material.map = THREE.ImageUtils.loadTexture(img);
                                        //window.background.scene.add( particle );
                                }
                        });
		});
	}
}

function jsonFlickrFeed(json) {
  	$.each(json.items, function(i, item) {
		//PARTICLE SYSTEM (2D)
		var particle = new THREE.Sprite();
		particle.position.x = Math.random() * -1200 + 600;
		particle.position.y = Math.random() * -1200 + 600;
		particle.position.z = Math.random() * -1200 + 600;
		particle.scale.x = -180;
		particle.scale.y = -180;
		particle.material.map = THREE.ImageUtils.loadTexture(item.media);
                window.background.scene.add( particle );
		//particle.material.color = new THREE.Color(0xffffff * Math.random());
		/*$.get("https://www.google.com", function(data) {
			html2canvas(data, {
        	       		onloaded: function(canvas) {
					var img = canvas.toDataURL("image/png")
					particle.material.map = THREE.ImageUtils.loadTexture(img);
					window.background.scene.add( particle );
				}
			});
		});*/
	//	}	

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
		material.side = THREE.DoubleSide;

		var radius = 50;
		var segments = 132; //<-- Increase or decrease for more resolution I guess

		var circleGeometry = new THREE.CircleGeometry( radius, segments );              
		var circle = new THREE.Mesh( circleGeometry, material );
		circle.position.x = Math.random() * -1200 + 600;
                circle.position.y = Math.random() * -1200 + 600;
                circle.position.z = Math.random() * -1200 + 600;
		window.background.scene.add(circle);*/

		//SPHERE 3D
		/*var geometry = new THREE.SphereGeometry(23, 10, 10, 0, Math.PI * 2, 0, Math.PI * 2);
		var material = new THREE.MeshNormalMaterial();
		material.color = new THREE.Color(0xffffff * Math.random());

		var sphere = new THREE.Mesh(geometry, material);

		sphere.position.x = Math.random() * -1200 + 600;
                sphere.position.y = Math.random() * -1200 + 600;
                sphere.position.z = Math.random() * -1200 + 600;

		window.background.scene.add(sphere);*/        
	});

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
	//these six values define the boundaries of the yellow box seen above
	this.light.shadowCameraNear = 2;
	this.light.shadowCameraFar = 5;
	this.light.shadowCameraLeft = -0.5;
	this.light.shadowCameraRight = 0.5;
	this.light.shadowCameraTop = 0.5;
	this.light.shadowCameraBottom = -0.5;
    	window.background.scene.add(this.light);

	window.background.renderer.render( window.background.scene, window.background.camera );

	/*if(window.background.tojo.itteration < 2) {
		$.ajax({
                	url: 'https://api.flickr.com/services/feeds/photos_public.gne',
                        dataType: 'jsonp',
                        data: { "tags": tag, "format": "json" }
                });}
	window.background.tojo.itteration++;*/
}

tojo5.prototype.renderNextFrame = function() {
}

tojo5.prototype.adjustNextFrameStaging = function() {
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

	/*this.light.position.x = this.radius * Math.cos( THREE.Math.degToRad( this.theta ) );
        this.light.position.y = this.radius * Math.cos( THREE.Math.degToRad( this.theta ) );
        this.light.position.z = this.radius * Math.sin( THREE.Math.degToRad( this.theta ) );
        this.light.lookAt( window.background.scene.position );
        this.light.updateMatrixWorld();*/

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

tojo5.prototype.updateKeyboard = function() {
        if ( keyboard.down("left") )
                mesh.translateX( -50 );
        if ( keyboard.down("right") )
                mesh.translateX(  50 );
        if ( keyboard.pressed("A") )
                mesh.translateX( -moveDistance );
        if ( keyboard.pressed("D") )
                mesh.translateX(  moveDistance );
        if ( keyboard.down("R") )
                mesh.material.color = new THREE.Color(0xff0000);
        if ( keyboard.up("R") )
                mesh.material.color = new THREE.Color(0x0000ff);
}

tojo5.prototype.onMouseDown = function() {

}

tojo5.prototype.onMouseMove = function() {

}

tojo5.prototype.onMouseUp = function() {

}