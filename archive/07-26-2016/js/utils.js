var mainCanvas;
var mainContext;
var stats;
var rojo;
var homeScreen;
var ojo2;

(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(chref=d.href).replace(e.href,"").indexOf("#")&&(!/^[a-z\+\.\-]+:/i.test(chref)||chref.indexOf(e.protocol+"//"+e.host)===0)&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone");

function onload() {
	pageSetup();

	ojo2 = new _2();
	ojo2.init();
	ojo2.animate();

	mainCanvas = document.getElementById( 'mainCanvas' );
	mainContext = mainCanvas.getContext( 'webgl' );

	//stats = new Stats( 'FPSHolder' );
	//rojo = new Rojo( 'rojoCanvas' );

	//animate();	
}

function animate() {
	resize();
	stats.update();
	rojo.update();
	homeScreen.update();
	requestAnimationFrame( animate );
}

function pageSetup() {
	//WINDOW EVENTS
	window.onresize = onSizeChange;

	//WEB APP LINKING	
	if(("standalone" in window.navigator) && window.navigator.standalone) {
 	       var noddy, remotes = false;
               document.addEventListener('click', function(event) {
	               noddy = event.target;
                       while(noddy.nodeName !== "A" && noddy.nodeName !== "HTML") {
        	               noddy = noddy.parentNode;
                       }
                       if('href' in noddy && noddy.href.indexOf('http') !== -1 && (noddy.href.indexOf(document.location.host) !== -1 || remotes)) {
                 	      event.preventDefault();
                              document.location.href = noddy.href;
                       }
		},false);
	}

	//IPHONE WEB APP STUFF
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
	
		//ANIMATIONS
		/*
		var fpsHolder = document.getElementById('FPSHolder');
	        var rojoCanvas = document.getElementById('rojoCanvas');
		fpsHolder.style.position = "absolute";
		fpsHolder.style.left = 103;
		fpsHolder.style.top = 1
		rojoCanvas.style.position = "absolute";;
		rojoCanvas.style.left = 250;
		rojoCanvas.style.top = 2;
		*/

		//NAVIGATION BAR
		if(window.orientation === 90 || window.orientation === -90) {

		}
		else {
			var table = document.getElementById( 'animationTable' );
			table.style.top = 20;
		}

		//SOCIAL MEDIA BAR
		//var socialMedia = document.getElementById( 'socialMedia' );
		//socialMedia.style.bottom = -5;	
	}

	//PAGE LAYOUT
	var table = document.getElementById( 'animationTable' );
        table.style.visibility = 'visible';


}

function onSizeChange() {
	ojo2.renderer.setSize( window.innerWidth, window.innerHeight );
	ojo2.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / (window.innerHeight), 1, 900 );
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
		var table = document.getElementById( 'animationTable' );
		if(window.innerHeight > window.innerWidth) {
                        table.style.top = 20;	
                }
		else {
                        table.style.top = 0;
		}
	}
	ojo2.renderer.render( ojo2.scene, ojo2.camera );
}
