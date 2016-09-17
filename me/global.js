
function onload(){
	var main = document.getElementById( 'mainCanvas' );
	App = new Set();
	App.Stage(main);
	var tojo = new tojo10();
	App.AddScene(tojo);
	//App.AnimateScene(tojo);	
}

function play(){
	var audio = document.getElementById("audio");
	audio.play();
}