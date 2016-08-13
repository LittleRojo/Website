function _2() {
	this.speed = 0.5;
        this.direction = 1;
	this.radius = 100;
	this.theta = 0.0;
	this.INTERSECTED;
}

_2.prototype.init = function() {
	this.container = document.getElementById( 'tojoSquaresContainer' );
	this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / (window.innerHeight), 1, 900 );
	this.camera.position.set( 0, 300, 500 );
	this.scene = new THREE.Scene();

	for ( var i = 0; i < 50; i ++ ) {
		var particle = new THREE.Sprite();
		particle.position.x = Math.random() * 1200 - 600;
		particle.position.y = Math.random() * 1200 - 600;
		particle.position.z = Math.random() * 1200 - 600;
		particle.scale.x = 80;
		particle.scale.y = 80;
		particle.material.map = THREE.ImageUtils.loadTexture('/img/LittleRojoLogo.png');
		this.scene.add( particle );
	}
				
	this.raycaster = new THREE.Raycaster();
	this.mouse = new THREE.Vector2();
	this.renderer = new THREE.CanvasRenderer( );
	this.renderer.setClearColor(0x000000);
	if(document.title == "Gallery") {
		this.renderer.setSize( 150, 150 );
	}
	else {
		this.renderer.setSize( window.innerWidth, window.innerHeight );
	}
	this.renderer.domElement.id = 'mainCanvas';
	this.container.appendChild( this.renderer.domElement );
}

_2.prototype.animate = function() {
	requestAnimationFrame( window.ojo2.animate );
	window.ojo2.render()
}

_2.prototype.render = function() {
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
	this.camera.position.x = this.radius * Math.cos( THREE.Math.degToRad( this.theta ) );
	this.camera.position.y = this.radius * Math.cos( THREE.Math.degToRad( this.theta ) );
	this.camera.position.z = this.radius * Math.sin( THREE.Math.degToRad( this.theta ) );
	this.camera.lookAt( this.scene.position );
	this.camera.updateMatrixWorld();
	
	this.raycaster.setFromCamera( this.mouse, this.camera );
	var intersects = this.raycaster.intersectObjects( this.scene.children );
	
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

	this.renderer.render( this.scene, this.camera );
}

_2.prototype.programFill = function ( context ) {
        context.beginPath();
        context.arc( 0, 0, 0.5, 0, PI2, true );
        context.fill();
};

_2.prototype.programStroke = function ( context ) {
        context.lineWidth = 0.00025;
        context.beginPath();
        context.arc( 0, 0, 0.5, 0, PI2, true );
        context.stroke();
};
