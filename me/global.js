function onload() {
	var main = document.getElementById( 'mainCanvas' );
	App = new Set();
	var tojo = new tojo10();
	App.Stage(main, tojo);
	App.Sound = new Sound(120);
	//App.Sound.Load();
	App.Sound.Play();
}