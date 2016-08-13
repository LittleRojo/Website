function Background(canvas) {	
	
	this.renderer = new THREE.WebGLRenderer({ canvas:canvas, antilias: true, alpha: true });
        this.renderer.setClearColor(0x000000);
        if(document.title == "Gallery") {
                this.renderer.setSize( 150, 150 );
        }
        else {
                this.renderer.setSize( window.innerWidth, window.innerHeight );
        }

        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / (window.innerHeight), 1, 900 );
        this.camera.position.set( 0, 300, 500 );

        this.scene = new THREE.Scene();

        this.raycaster = new THREE.Raycaster();

        this.mouse = new THREE.Vector2();

	this.tojo3 = new tojo3();

	return {
		renderer:this.renderer,
		camera:this.camera,
		scene:this.scene,
		raycaster:this.raycaster,
		mouse:this.mouse,
		tojo3:this.tojo3,
		init:this.init,
		renderNextFrame:this.renderNextFrame,
		adjustNextFrameStaging:this.adjustNextFrameStaging,
		animate:this.animate,
		drawScene:this.drawScene
	};
}

Background.prototype.drawScene = function() {
        this.tojo3.drawScene();
}

Background.prototype.renderNextFrame = function() {
	this.tojo3.renderNextFrame();
}

Background.prototype.adjustNextFrameStaging = function() {
	this.tojo3.adjustNextFrameStaging();
}
