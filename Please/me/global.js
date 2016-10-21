window.addEventListener( 'resize', onWindowResize, false );

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