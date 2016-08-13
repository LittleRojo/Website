//WEB APP NAVIGATION
(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(chref=d.href).replace(e.href,"").indexOf("#")&&(!/^[a-z\+\.\-]+:/i.test(chref)||chref.indexOf(e.protocol+"//"+e.host)===0)&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone");

function onload() {

	//WINDOW OBJECTS
        this.mainCanvas = document.getElementById( 'mainCanvas' );

	if(this.mainCanvas != null) {
	        this.mainContext = mainCanvas.getContext( 'webgl' );
	}

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
	
		//IPHONE ORIENTATION - PROFILE
		if(window.orientation === 90 || window.orientation === -90) {
		}

		//IPHONE ORIANTATION - LANDSCAPE
		else {  
			//MOVE HEADER TABLE
			var table = document.getElementById( 'headerTable' );
			if(table != null) {
				table.style.top = 20;
			}
		}
		
		//MOVE HEADER TABLE
                var table = document.getElementById( 'headerTable' );
                if(table != null) {
                        table.style.top = 20;
                }
	}

	//MOVE MAP
        var map = document.getElementById( 'map' );
       	if(map != null) {
        	map.style.height = window.innerHeight - 21;
        }
	
	//PAGE LAYOUT
	var table = document.getElementById( 'headerTable' );
	if(table != null) {
	        table.style.visibility = 'visible';
	}

	this.mainCanvas = document.getElementById( 'mainCanvas' );
	if(this.mainCanvas != null) {
	        this.mainContext = mainCanvas.getContext( 'webgl' );
	}
	
	//MOUSE DOWN
	//window.background.renderer.domElement.addEventListener( 'mousemove', window.background.onMouseMove, false );
	//window.background.renderer.domElement.addEventListener( 'mousedown', window.background.onMouseDown, false );
	//window.background.renderer.domElement.addEventListener( 'mouseup', window.background.onMouseUp, false );

	//GO
	if(window.location.pathname == "/index.html" || window.location.pathname == "/" || window.location.pathname.includes("archive")) {
		//SET OBJECT
        	this.background = new Background(mainCanvas);

		//DRAW SCENE!!
	        this.background.drawScene();

        	//FAD IN SCREEN
	        window.fadeBackgroundIn(0);

		//GO
		window.animate();

		mapboxgl.accessToken = 'pk.eyJ1IjoibGl0dGxlcm9qbyIsImEiOiJjaXJpbmNmazYwMDBiZmduYnJwcHE3bTFyIn0.QElYybeFCSAo-q4gRLq6cA';
	        var bounds = [
        	        [143,90],
                	[-140,10]];
	        var map = new mapboxgl.Map ({
                	trackResize: true,
        	        dragRotate: false,
	                //minZoom: 1.2,
                	//dragPan: false,
        	        //maxBounds: [[ 144, 90 ],[ -140, 10]],
	                //center: [7, 32],
                	container: 'map',
        	        style: 'mapbox://styles/littlerojo/ciripj1kq0003gjns0tvtqvb4'
	        });
	}
	else if(window.location.pathname == "/gallery.html") {

        }
	else if(window.location.pathname == "/games.html") {

        }
	else if(window.location.pathname == "/archive.html") {

        }
	else if(window.location.pathname == "/admin.html") {

        }

	//ACCELEROMETER
	if (window.DeviceMotionEvent != undefined) {
		window.ondevicemotion = function(e) {
			ax = e.accelerationIncludingGravity.x;
			ay = e.accelerationIncludingGravity.y;
			az = e.accelerationIncludingGravity.z;
			ara = e.rotationRate.alpha;
			arb = e.rotationRate.beta;
			arg = e.rotationRate.gamma;
		}
	}
}

function onSizeChange() {
	return;
	if(this.background != null) {
	        this.background.renderer.setSize( window.innerWidth, window.innerHeight );
	        this.background.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / (window.innerHeight), 1, 900 );
	}

	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
		//IPHONE ORIENTATION - PROFILE
        	if(window.orientation === 90 || window.orientation === -90) {
			if(table != null) {
        	                table.style.top = 20;
	                }
	        }

      		//IPHONE ORIANTATION - LANDSCAPE
	       	else {
        		//MOVE HEADER TABLE
                	var table = document.getElementById( 'headerTable' );
	                if(table != null) {
        	        	table.style.top = 0;
              		}
		}
	}
}

function animate() {
	if(window.background != null) {
	        window.background.renderNextFrame();
        	window.background.adjustNextFrameStaging();
	}
        requestAnimationFrame( window.animate );
}

function fadeBackgroundIn() {
	/*if(window.background.alpha < 1) {
		window.background.alpha += .00001;
		window.background.renderer.setClearColor(0x000000, window.background.alpha);
		//this.fadeBackgroundIn(this.mainCanvas.style.opacity);	
		//window.background.renderer.render( window.background.scene, window.background.camera );  //best way to render?
		requestAnimationFrame( window.fadeBackgroundIn );
	}*/
}

function rojoClick() {
	
	return;

	/*var map = document.getElementById( 'map' );
	if(window.mainCanvas.style.zIndex == -2) {		
		window.mainCanvas.style.zIndex = -1;
		map.style.zIndex = -2;
	}
	else {
		window.mainCanvas.style.zIndex = -2;
		map.style.zIndex = -1;
	}*/

	//SET OBJECT
        window.background = new Background(window.mainCanvas);

        //MOUSE DOWN
        window.background.renderer.domElement.addEventListener( 'mousemove', window.background.onMouseMove, false );
        window.background.renderer.domElement.addEventListener( 'mousedown', window.background.onMouseDown, false );
        window.background.renderer.domElement.addEventListener( 'mouseup', window.background.onMouseUp, false );

        //GO
	//DRAW SCENE!!
        window.background.drawScene();

        //FAD IN SCREEN
        window.fadeBackgroundIn(0);

        //GO
        window.animate();

}
