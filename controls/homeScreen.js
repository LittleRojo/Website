function homeScreen() {
	this.radius = 600;
	this.theta = 0;
	this.INTERSECTED;
}

homeScreen.prototype.init = function() {
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	this.container = document.getElementById( 'homeCanvas' );
	this.container.width = window.innerWidth;
	this.container.height = window.innerHeight - 20;
	this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / (window.innerHeight), 1, 900 );
	this.camera.position.set( 0, 300, 500 );
	this.scene = new THREE.Scene();

	this.raycaster = new THREE.Raycaster();
	this.mouse = new THREE.Vector2();
	this.renderer = new THREE.CanvasRenderer();
	this.renderer.setClearColor(0x000000);
	this.renderer.setSize( window.innerWidth, window.innerHeight );
}

homeScreen.prototype.animate = function() {
	requestAnimationFrame( window.homeScreen.animate );
	window.homeScreen.render()
}

homeScreen.prototype.render = function() {
	window.homeScreen.renderer.render( window.homeScreen.scene, window.homeScreen.camera );
}
