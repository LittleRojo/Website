window.addEventListener( 'resize', onWindowResize, false );

window.addEventListener( 'mousedown', onMouseDown, false );
window.addEventListener( 'mousemove', onMouseMove, false );
window.addEventListener( 'mouseup', onMouseUp, false );

window.addEventListener( 'DOMMouseScroll', onMouseWheel, false ); 

window.addEventListener( 'touchstart', onTouchStart, false );
window.addEventListener( 'touchmove', onTouchMove, false );
window.addEventListener( 'touchend', onTouchEnd, false );

window.addEventListener( 'keydown', onKeyDown, false );

function onload(pageNumber){
	mainCanvas = document.getElementById( 'mainCanvas' );
	mainCanvas.style.visibility = 'visible';

	renderer = new THREE.WebGLRenderer({ canvas:mainCanvas, antilias: true, alpha: true, clearAlpha: 1});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( 0x000000, 1 );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.renderReverseSided = false;
	renderer.sortObjects = false;
	
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000000);
	camera.position.set(-1, -1, 5);

	orbitControls = new THREE.OrbitControls(camera);
	orbitControls.zoomSpeed = .1;
	orbitControls.rotateSpeed = .001;
	orbitControls.keyPanSpeed = .001;
	
	fakeCamera = new THREE.Object3D();
	vrControls = new THREE.VRControls(fakeCamera);
	effect = new THREE.VREffect( renderer );

	if ( WEBVR.isAvailable() === true ) {
		vrButton = WEBVR.getButton( effect );
		document.body.appendChild( vrButton );
	}

	scene = new THREE.Scene();
    clock = new THREE.Clock();

	/*hemiLight();*/
    directionalLight();
    spotLight();
    carpet();

    AnimateScene();	
}

var stopScene = false;
function AnimateScene(delta) {
    if(stopScene) {
        startScene = false;
        return;
    }
    
	orbitControls.update();
    vrControls.update();

    orbitPos = camera.position.clone();
    
    var rotatedPosition = fakeCamera.position.applyQuaternion( camera.quaternion );
    camera.position.add(rotatedPosition);
    camera.quaternion.multiply(fakeCamera.quaternion);  
    
    effect.render( scene, camera );
    effect.requestAnimationFrame( AnimateScene );

	camera.position.copy(orbitPos);
}

function onWindowResize(){
	if(vrButton !== undefined) {
		vrButton.style.left = window.innerWidth / 2 - 32 + 'px';
		vrButton.style.top = window.innerHeight - 58 + 'px';
	}

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
	//renderer.setSize( window.innerWidth, window.innerHeight );
	//effect.setSize( window.innerWidth, window.innerHeight );

	effect.render( scene, camera )
}

function onMouseDown() {

}

function onMouseMove() {

}

function onMouseUp() {
	
}

function onMouseWheel() {

}

function onTouchStart() {

}

function onTouchMove() {
	
}

function onTouchEnd() {
	
}

function onKeyDown() {
	
}