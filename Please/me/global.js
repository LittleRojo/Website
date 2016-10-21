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
	var mainCanvas = document.getElementById( 'mainCanvas' );
	mainCanvas.style.visibility = 'visible';

	App = new Set();
	var tojo = new tojo12();	
	App.Stage(mainCanvas, tojo);	
}

function onWindowResize(){
    App.camera.aspect = window.innerWidth / window.innerHeight;
    App.camera.updateProjectionMatrix();
	App.renderer.setSize( window.innerWidth, window.innerHeight );
	
	App.camera.aspect = window.innerWidth / window.innerHeight;
	App.camera.updateProjectionMatrix();
	App.effect.setSize( window.innerWidth, window.innerHeight );

	App.UpdateScene();
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