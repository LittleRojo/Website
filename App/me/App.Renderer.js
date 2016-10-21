Renderer = function() {
	var canvas = document.getElementById( "mainCanvas" );    
    THREE.WebGLRenderer.call( this, {		
		canvas: canvas,
		antilias: true, 
		alpha: true, 
		clearAlpha: 1
	} );
}

Renderer.prototype = Object.create( THREE.WebGLRenderer.prototype );
Renderer.prototype.constructor = Renderer;

Renderer.prototype.load = function() {
	this.setPixelRatio( window.devicePixelRatio );
	this.setSize( window.innerWidth, window.innerHeight );
	this.setClearColor( 0x000000, 1 );
	this.shadowMap.enabled = true;
    this.shadowMap.renderReverseSided = false;
	this.sortObjects = false;
}