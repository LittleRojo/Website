function Background() {	
}

Background.prototype.init = function(id) {
        var container = document.getElementById( id );
        this.renderer = new THREE.WebGLRenderer({ antilias: true, alpha: true });
        this.renderer.setSize( window.innerWidth, window.innerHeight);
        container.appendChild( this.renderer.domElement );

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000);

        this.renderer.setClearColor(0xFFFFFF,1);

	//requestAnimationFrame( window.ojoBackground.animate );
}

Background.prototype.animate = function() {
        requestAnimationFrame( window.ojoBackground.animate );

	window.ojoFPS.animate();
	//window.ojoBackground.render();
	window.rojo.animate();

	if(window.location.href == "https://www.littlerojo.com/") {
                //window.ojo1.render();
                //window.ojo2.render();
        }
	if(window.location.href.includes('gallery')) {
		window.ojo1.render();
		window.ojo2.render();
	}
	window.ojoBackground.render();
}

Background.prototype.render = function() {
        window.ojoBackground.renderer.render( window.ojoBackground.scene, window.ojoBackground.camera );
	//window.ojoBackground.container1.style.backgroundColor = "rgba(112,128,144,1)";
}
