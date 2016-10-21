loadedScripts = {};
loadScript = function( url, onLoaded, onCompleted ) {
    if( url in loadedScripts ) {        
        return;
    }
    loadedScripts[url] = script;

    var script = document.createElement( "script" );
    script.setAttribute( 'type', "text/javascript" );
    script.setAttribute( 'src', url );
    script.setAttribute( 'id', url );
    script.onLoadedCallback = onLoaded;
    script.onCompletedCallback = onCompleted;
    script.onload = function() {        
        if ( this.onLoadedCallback != null ) {
            this.onLoadedCallback.call( this );   
        }
    }
    document.head.appendChild( script );
    return script;
}

var WebVRConfig = { 
        DEFER_INITIALIZATION: true,
        //ROTATE_INSTRUCTIONS_DISABLED: true,
    }
/*
loadScript( "js/three.min.js", function() {
    loadScript( "js/webvr-polyfill.js", function() { 
        InitializeWebVRPolyfill();      
        loadScript( "js/WebVR2.js", function() {  
            loadScript( "js/VREffect.js", function() {  
                loadScript( "me/App.Renderer.js", function() {
                    loadScript( "js/VRControls.js", function() {
                        loadScript( "me/App.Camera.js", function() {
                            loadScript( "me/App.Scene.js", function() {   
                                loadScript( "me/App.tojo13.js", function() {                              
                                    App = new App();   		
                                    App.load();
                                    App.startAnimation();
                                } );
                            } );
                        } );
                    } );
                } );
            } ); 
        } );
    } );  
} );*/

App = function() { 
}

App.prototype.load = function() {
    this.clock = new THREE.Clock();
    this.renderer = new Renderer();
    this.renderer.load();
    this.camera = new Camera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 );
    this.camera.load();
    this.fakeCamera = new THREE.Object3D();
	this.vrCamera = new THREE.VRControls( this.fakeCamera );
    this.scene = new Scene();
    this.scene.load();
    this.vrRenderer = new THREE.VREffect( this.renderer );
    this.vrRenderer.setSize( window.innerWidth, window.innerHeight );
    
    if ( WEBVR.isAvailable() === true ) {
		document.body.appendChild( WEBVR.getButton( this.vrRenderer ) );
	}

    this.experience = new tojo13();
    this.experience.load();
}

App.prototype.updateFrame = function() {
	var delta = App.clock.getDelta();

	//App.vrCamera.update();
    App.experience.updateFrame( delta );
}

App.prototype.render = function() {
    App.camera.orbitPos = App.camera.position.clone();   
	App.camera.orbitRot = App.camera.rotation.clone();
    var rotatedPosition = App.camera.position.applyQuaternion( App.camera.quaternion );
    App.camera.position.add(rotatedPosition);
    App.camera.quaternion.multiply(App.fakeCamera.quaternion);

    App.vrRenderer.render( App.experience, App.camera );
  
    App.camera.position.copy(App.camera.orbitPos);
	App.camera.rotation.copy(App.camera.orbitRot);
}

App.prototype.startAnimation = function() {
    if( App.stopScene ) {
        App.startScene = false;
        return;
    }
	
	App.updateFrame();  
	App.render();

    App.vrRenderer.requestAnimationFrame( App.startAnimation );	
}

App.prototype.stopAnimation = function() {
	App.stopScene = true;
}

App.prototype.getButton = function( effect ) {
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
        App.vrButton.textContent = effect.isPresenting ? 'FLAT' : 'VR';
    }, false );

    return this.vrButton;
}
function Pixel(){
    this.position = new THREE.Vector2();
    this.color = [],
    this.size = 1;
}

function deg( degree ) { 
    return degree * ( Math.PI/180 ); 
}

function rand( min, max ) {
    return Math.random() * max + min;
}

function apply( object ) {
}

function go() {
    App = new App();   		
    App.load();
    App.startAnimation();
}