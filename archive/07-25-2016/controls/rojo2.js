function Rojo() {
}

Rojo.prototype.init = function(id) {
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	var container = document.getElementById( id );
	this.renderer = new THREE.WebGLRenderer({ canvas:container });
        this.renderer.setSize( 20, 15 );

	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);

	var geometry = new THREE.BoxGeometry(275,275,275);
	var material = new THREE.MeshBasicMaterial({color: 0xFF0000, wireframe: true});
	this.renderer.setClearColor(0x000000,0);
	this.cube = new THREE.Mesh(geometry, material);
	this.scene.add(this.cube);
	this.camera.position.z = 500; 
}

Rojo.prototype.animate = function() {
	requestAnimationFrame( window.rojo.animate );
	window.rojo.render()
}

Rojo.prototype.render = function() {
	window.rojo.renderer.render( window.rojo.scene, window.rojo.camera );
        window.rojo.cube.rotation.x += 0.01;
        window.rojo.cube.rotation.y += 0.01;
}
