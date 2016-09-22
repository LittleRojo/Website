function onload(){
	var title = document.getElementById( 'navigation' );
	title.style.left = window.innerWidth / 2 - 50;
	title.style.visibility = "visible";
	var main = document.getElementById( 'mainCanvas' );
	main.style.right = window.innerWidth - 20;
	App = new Set();
	var tojo = new tojo10();
	App.Stage(main, tojo);
	//App.Sound = new Sound(120);
	//App.Sound.Load();
	//App.Sound.Play();
}