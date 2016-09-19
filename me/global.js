var w;
function onload(){
	var main = document.getElementById( 'mainCanvas' );
	App = new Set();
	var tojo = new tojo10();
	//App.AddWorld();
	App.Stage(main, tojo);	
	//App.AnimateScene();
}

function play(){
	var audio = document.getElementById("audio");
	audio.play();
}