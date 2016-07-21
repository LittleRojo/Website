function _2() {
	this.radius = 600;
	this.theta = 0;
	this.INTERSECTED;
}

_2.prototype.init = function() {
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	this.container = document.getElementById( 'tojoSquaresContainer' );
	this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / (window.innerHeight), 1, 900 );
	this.camera.position.set( 0, 300, 500 );
	this.scene = new THREE.Scene();

	for ( var i = 0; i < 300; i ++ ) {
		var particle = new THREE.Sprite();
		particle.position.x = Math.random() * 1200 - 600;
		particle.position.y = Math.random() * 1200 - 600;
		particle.position.z = Math.random() * 1200 - 600;
		particle.scale.x = particle.scale.y =  20 + 20;
		particle.material.color = new THREE.Color(0xffffff * Math.random());
		this.scene.add( particle );
	}
				
	this.raycaster = new THREE.Raycaster();
	this.mouse = new THREE.Vector2();
	this.renderer = new THREE.CanvasRenderer();
	this.renderer.setClearColor(0x000000);
	if(document.title == "Gallery") {
		this.renderer.setSize( 150, 150 );
	}
	else {
		this.renderer.setSize( window.innerWidth, window.innerHeight );
	}
	this.container.appendChild( this.renderer.domElement );
}

_2.prototype.animate = function() {
	requestAnimationFrame( window.ojo2.animate );
	window.ojo2.render()
}

_2.prototype.render = function() {
	//requestAnimationFrame( window.ojo2.render );
	window.ojo2.theta += .1;
	window.ojo2.camera.position.x = window.ojo2.radius * Math.sin( THREE.Math.degToRad( window.ojo2.theta ) );
	window.ojo2.camera.position.y = window.ojo2.radius * Math.sin( THREE.Math.degToRad( window.ojo2.theta ) );
	window.ojo2.camera.position.z = window.ojo2.radius * Math.cos( THREE.Math.degToRad( window.ojo2.theta ) );
	window.ojo2.camera.lookAt( window.ojo2.scene.position );
	window.ojo2.camera.updateMatrixWorld();

	this.raycaster.setFromCamera( window.ojo2.mouse, window.ojo2.camera );
	var intersects = window.ojo2.raycaster.intersectObjects( window.ojo2.scene.children );
	
	if ( intersects.length > 0 ) {
		if ( window.ojo2.INTERSECTED != intersects[ 0 ].object ) {
			if ( window.ojo2.INTERSECTED ) window.ojo2.INTERSECTED.material.program = window.ojo2.programStroke;
			window.ojo2.INTERSECTED = intersects[ 0 ].object;
			window.ojo2.INTERSECTED.material.program = window.ojo2.programFill;
		}
	} else {
		if ( window.ojo2.INTERSECTED ) window.ojo2.INTERSECTED.material.program = window.ojo2.programStroke;
		window.ojo2.INTERSECTED = null;
	}
	
	window.ojo2.renderer.render( window.ojo2.scene, window.ojo2.camera );
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
