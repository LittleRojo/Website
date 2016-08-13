function tojo3() {
	this.speed = 0.5;
        this.direction = 1;
        this.radius = 100;
        this.theta = 0.0;
        this.INTERSECTED;
	this.z = -400;
	this.looper = 0;
}

function jsonFlickrFeed(json) {
	var tags;
  	$.each(json.items, function(i, item) {
		var geometry = new THREE.PlaneGeometry( 240, 180, 70);
                var material = new THREE.MeshPhongMaterial();
		material.map = THREE.ImageUtils.loadTexture(item.media.m)
               	mesh = new THREE.Mesh(geometry, material );
               	mesh.position.x = -4000;//Math.floor(Math.random() * 200);
		mesh.position.x -= 100;
               	mesh.position.z = (-1400 * i + 400) * 1;		
               	window.background.scene.add( mesh );
	
		tags = item.tags;
  	});
	if(window.background.tojo.looper < 1) {
		$.ajax({
        	        url: 'https://api.flickr.com/services/feeds/photos_public.gne',
	                dataType: 'jsonp',
                	data: { "tags": tags, "format": "json" }
		});
		window.background.tojo.looper += 1;
	}
};

tojo3.prototype.drawScene = function(canvasId) {
	/*if(Date.now() % 3 == 0) {
		$.ajax({
                        url: 'https://api.flickr.com/services/feeds/photos_public.gne',
                        dataType: 'jsonp',
                        data: { "tags": "Track and Field", "format": "json" }
                });
                this.looper = 1;
	}
	else if(Date.now() % 4 == 0) {
		$.ajax({
                	url: 'https://api.flickr.com/services/feeds/photos_public.gne',
	                dataType: 'jsonp',
        	        data: { "tags": "Rio Olympics", "format": "json" }
        	});
        }
	else if(Date.now() % 5 == 0) {
		$.ajax({
	                url: 'https://api.flickr.com/services/feeds/photos_public.gne',
                	dataType: 'jsonp',
        	        data: { "tags": "Michael Phelps", "format": "json" }
	        });
        }
	else if(Date.now() % 7 == 0 || Date.now() % 9 == 0) {
	  	$.ajax({
	                url: 'https://api.flickr.com/services/feeds/photos_public.gne',
                	dataType: 'jsonp',
        	        data: { "tags": "Hillary Clinton", "format": "json" }
	        });
        }
	else {*/
		$.ajax({
	                url: 'https://api.flickr.com/services/feeds/photos_public.gne',
                	dataType: 'jsonp',
        	        data: { "tags": "Leanardo Di Vinci", "format": "json" }
	        });
	//}

	window.background.scene.add( new THREE.AmbientLight( 0xffffff ));
	this.light = new THREE.DirectionalLight( 0xffffff );

    	//LIGHT 1
	/*this.light.position.set( 0, 1, 1 ).normalize();
	window.background.scene.add(this.light);*/

	//LIGHT 2
	this.light.position.set(.3, .8, .2);
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

tojo3.prototype.startPage = function() {
	$.ajax({
                        url: 'https://api.flickr.com/services/feeds/photos_public.gne',
                        dataType: 'jsonp',
                        data: { "tags": "Leanardo Di Vinci", "format": "json" }
                });	
}

tojo3.prototype.renderNextFrame = function() {
	for(var i=0; i<window.background.scene.children.length; i++) {		
		window.background.scene.children[i].translateZ(20);
		if(window.background.scene.children[i].position.z > 100 && window.background.scene.children[i].type != "AmbientLight") {
			//window.background.scene.children[i].transperant = 1;
			//window.background.scene.children[i].opacity = 0.3;//(1000 - window.background.scene.children[i].material.opacity) / 1000;
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

tojo3.prototype.updateKeyboard = function() {
        /*if ( keyboard.down("left") )
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
                mesh.material.color = new THREE.Color(0x0000ff);*/
}

tojo3.prototype.onMouseDown = function() {

}

tojo3.prototype.onMouseMove = function() {

}

tojo3.prototype.onMouseUp = function() {

}

