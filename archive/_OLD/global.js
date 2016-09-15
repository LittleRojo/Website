
function onload(){
	var main = document.getElementById( 'mainCanvas' );
	App = new Set();
	App.Stage(main);
	var tojo = new tojo9(60);
	App.AddScene(tojo);
	App.AnimateScene(tojo);	
}