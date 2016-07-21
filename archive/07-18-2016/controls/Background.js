function Background() {	
}

Background.prototype.init = function() {
        this.container1 = document.getElementById( 'background' );
        this.renderer1 = new THREE.WebGLRenderer({ antilias: true, alpha: true });
        this.renderer1.setSize( window.innerWidth, window.innerHeight);
        this.container1.appendChild( this.renderer1.domElement );

        this.scene1 = new THREE.Scene();
        this.camera1 = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);

        this.renderer1.setClearColor(0xFFFFFF,1);

	requestAnimationFrame( window.ojoBackground.animate );
}

Background.prototype.animate = function() {
        requestAnimationFrame( window.ojoBackground.animate );

	window.ojoFPS.render();
	window.ojoBackground.render();
	window.rojo.render();

	if(window.location.href.includes('gallery')) {
		window.ojo1.render();
		window.ojo2.render();
	}
	window.ojoBackground.render();
}

Background.prototype.render = function() {
        window.ojoBackground.renderer1.render( window.ojoBackground.scene1, window.ojoBackground.camera1 );
	window.ojoBackground.container1.style.backgroundColor = "rgba(112,128,144,1)";
}
