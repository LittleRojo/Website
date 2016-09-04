var renderer
var camera;
var scene;
var raycaster;
var mouse;

var tojo2;

function Background(canvas) {	
	this.renderer = new THREE.WebGLRenderer({ canvas:canvas, antilias: true, alpha: true });	
        this.renderer.setClearColor( new THREE.Color(0x000000) );
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

	this.tojo2 = new tojo2();

	return {
		renderer:this.renderer,
		camera:this.camera,
		scene:this.scene,
		raycaster:this.raycaster,
		mouse:this.mouse,
		tojo2:this.tojo2,
		alpha:this.alpha,
		init:this.init,
		renderNextFrame:this.renderNextFrame,
		adjustNextFrameStaging:this.adjustNextFrameStaging,
		animate:this.animate,
		drawScene:this.drawScene
	};
}

Background.prototype.animate = function() {
        window.background.renderNextFrame();
        window.background.adjustNextFrameStaging();
        requestAnimationFrame( window.background.animate );
}

Background.prototype.drawScene = function() {
        this.tojo2.drawScene();
	window.background.renderer.render( window.background.scene, window.background.camera );  //best way to render?
}

Background.prototype.renderNextFrame = function() {
	this.tojo2.renderNextFrame();
	window.background.renderer.render( window.background.scene, window.background.camera );  //best way to render?
}

Background.prototype.adjustNextFrameStaging = function() {
	this.tojo2.adjustNextFrameStaging();
	window.background.renderer.render( window.background.scene, window.background.camera );
}
