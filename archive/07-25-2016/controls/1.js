function _1() {
}

_1.prototype.init = function() {
	this.container1 = document.getElementById( 'container1' );
	this.renderer1 = new THREE.WebGLRenderer();
	this.renderer1.setSize( 150, 150 );
	this.container1.appendChild( this.renderer1.domElement );

	this.scene1 = new THREE.Scene();
	this.camera1 = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);

	this.geometry1 = new THREE.BoxGeometry(200,200,200);
	this.material1 = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
	this.renderer1.setClearColor(0x000000,1);
	this.cube1 = new THREE.Mesh(this.geometry1, this.material1);
	this.scene1.add(this.cube1);
	this.camera1.position.z = 1000;    
}

_1.prototype.animate = function() {
	requestAnimationFrame( window.ojo1.animate );
	window.ojo1.render();
}

_1.prototype.render = function() {
	window.ojo1.cube1.rotation.x += 0.01;
	window.ojo1.cube1.rotation.y += 0.01;
	window.ojo1.renderer1.render( window.ojo1.scene1, window.ojo1.camera1 );	
}
