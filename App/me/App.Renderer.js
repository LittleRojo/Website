Renderer = function() {    
    THREE.WebGLRenderer.call( this, {		
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

	this.vrRenderer = new THREE.VREffect( App.renderer );
    this.vrRenderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.getButton( this.vrRenderer ) );

	this.mainCanvas = this.domElement;
    document.body.appendChild( this.mainCanvas );
}

Renderer.prototype.getButton = function( effect ) {
    this.vrButton = document.createElement( 'button' );
    this.vrButton.style.position = 'absolute';
    this.vrButton.style.left = 'calc(50% - 33px)';
    this.vrButton.style.bottom = '20px';
    this.vrButton.style.width = '63px';
    this.vrButton.style.height = '44px';
    this.vrButton.style.border = '0';
    this.vrButton.style.padding = '8px';
    this.vrButton.style.cursor = 'pointer';
    this.vrButton.style.backgroundColor = '#000';
    this.vrButton.style.color = '#fff';
    this.vrButton.style.fontFamily = 'sans-serif';
    this.vrButton.style.fontSize = '13px';
    this.vrButton.style.fontStyle = 'normal';
    this.vrButton.style.textAlign = 'center';
    this.vrButton.style.zIndex = '999';
    this.vrButton.textContent = 'VR';
    this.vrButton.style.backgroundImage = 'url(img/vrLogoIcon.png)';
    this.vrButton.onclick = function() {
        if( effect.isPresenting ) {
            effect.exitPresent();
        }  
        else {
            effect.requestPresent();
        }
    };

    window.addEventListener( 'vrdisplaypresentchange', function ( event ) {
        if( effect.isPresenting ) {
        }
        else {
        }
        this.vrButton.textContent = effect.isPresenting ? 'FLAT' : 'VR';
    }, false );

    return this.vrButton;
}