
function onload(){
	var main = document.getElementById( 'mainCanvas' );
	App = new Set();
	App.Stage(main);
	var tojo = new tojo10();
	App.AddScene(tojo);	
}

function play(){
	var audio = document.getElementById("audio");
	audio.play();
}