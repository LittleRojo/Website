
function onload(){
	var main = document.getElementById( 'mainCanvas' );
	App = new Set();
	var tojo = new tojo10();
	App.Stage(main, tojo);
}

function play(){
	var audio = document.getElementById("audio");
	audio.play();
}