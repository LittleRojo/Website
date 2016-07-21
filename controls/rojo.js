function Rojo() {
}

Rojo.prototype.init = function() {
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	this.container = document.getElementById( 'rojo' );
	this.container.style.left = window.innerWidth - 68;
	this.renderer1 = new THREE.WebGLRenderer({ alpha:true });
        this.renderer1.setSize( 48, 25 );
	this.container.appendChild( this.renderer1.domElement );

	this.scene1 = new THREE.Scene();
	this.camera1 = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);

	this.geometry1 = new THREE.BoxGeometry(200,200,200);
	this.material1 = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
	this.renderer1.setClearColor(0x000000,0);
	this.cube1 = new THREE.Mesh(this.geometry1, this.material1);
	this.scene1.add(this.cube1);
	this.camera1.position.z = 500; }

Rojo.prototype.animate = function() {
	requestAnimationFrame( window.rojo.animate );
	window.rojo.render()
}

Rojo.prototype.render = function() {
	window.rojo.renderer1.render( window.rojo.scene1, window.rojo.camera1 );
        window.rojo.cube1.rotation.x += 0.01;
        window.rojo.cube1.rotation.y += 0.01;
}
