function FPS() {
}

FPS.prototype.init = function() {
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	this.container = document.getElementById( '2dCanvasFPS' );
	this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / (window.innerHeight), 1, 900 );
	this.camera.position.set( 0, 300, 500 );
	this.scene = new THREE.Scene();

	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setClearColor(0x000000);
	this.renderer.setSize( 140, 140 );

	this.stats = new Stats();
}

FPS.prototype.animate = function() {
	requestAnimationFrame( window.ojoFPS.animate );
	window.ojoFPS.stats.update();
	window.ojoFPS.render();
}

FPS.prototype.render = function() {
	window.ojoFPS.stats.update();
	window.ojoFPS.renderer.render( window.ojoFPS.scene, window.ojoFPS.camera );
}


