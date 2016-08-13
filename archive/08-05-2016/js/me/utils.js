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

	var rojo = document.getElementById( 'rojoBitches' );

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
		
		//IPHONE ORIENTATION - PROFILE
		if(window.orientation === 90 || window.orientation === -90) {
			//ROJO IMAGE		
			if(rojo != null) {
				//rojo.style.position = 'absolute';
				//rojo.style.bottom = 0;
				//rojo.style.left = 163;
			}
		}

		//IPHONE ORIANTATION - LANDSCAPE
		else {  
			//MOVE HEADER TABLE
			var table = document.getElementById( 'headerTable' );
			if(table != null) {
				table.style.top = 20;
			}
			
			//ROJO IMAGE
                        if(rojo != null) {
                                //rojo.style.position = 'absolute';
                                //rojo.style.bottom = 0;
                                //rojo.style.left = 163
                        }
		}
		
		//MOVE HEADER TABLE
                var table = document.getElementById( 'headerTable' );
                if(table != null) {
                        table.style.top = 20;
                }
	}
	
	//PAGE LAYOUT
	var table = document.getElementById( 'headerTable' );
	if(table != null) {
	        table.style.visibility = 'visible';
	}

        if(rojo != null) {
	        //rojo.style.position = 'absolute';
                rojo.style.visibility = 'visible';
        }

	var table = document.getElementById( 'socialMedia' );
        if(table != null) {
		table.style.visibility = 'visible';
	}

	this.mainCanvas = document.getElementById( 'mainCanvas' );
	if(this.mainCanvas != null) {
	        this.mainContext = mainCanvas.getContext( 'webgl' );
	}
	//SET OBJECT
	this.background = new Background(mainCanvas);

	//MOUSE DOWN
	window.background.renderer.domElement.addEventListener( 'mousemove', window.background.onMouseMove, false );
	window.background.renderer.domElement.addEventListener( 'mousedown', window.background.onMouseDown, false );
	window.background.renderer.domElement.addEventListener( 'mouseup', window.background.onMouseUp, false );

	//GO
	if(window.location.pathname == "/index.html" || window.location.pathname == "/" || window.location.pathname.includes("/archive/")) {
		//DRAW SCENE!!
	        this.background.drawScene();

        	//FAD IN SCREEN
	        window.fadeBackgroundIn(0);

		//GO
		window.animate();
	}
	else if(window.location.pathname == "/gallery.html") {

        }
	else if(window.location.pathname == "/games.html") {

        }
	else if(window.location.pathname == "/archive.html") {

        }
	else if(window.location.pathname == "/admin.html") {

        }
	
	//onSizeChange();
}

function onSizeChange() {
	if(this.background != null) {
	        this.background.renderer.setSize( window.innerWidth, window.innerHeight );
	        this.background.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / (window.innerHeight), 1, 900 );
	}

	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
		var table = document.getElementById( 'headerTable' );
        	if(table != null) {
        		//table.style.top = 0;
		}

		//IPHONE ORIENTATION - PROFILE
        	if(window.orientation === 90 || window.orientation === -90) {
			
			if(table != null) {
        	                table.style.top = 20;
	                }

 	       		//ROJO IMAGE
	               	var rojo = document.getElementById( 'rojoBitches' );
        		if(rojo != null) {
               			//rojo.style.position = 'absolute';
                        	//rojo.style.bottom = 0;
	                        //rojo.style.left = 163;
				//rojo.style.visibility = 'visible';
                	}
	        }

      		//IPHONE ORIANTATION - LANDSCAPE
	       	else {
        		//MOVE HEADER TABLE
                	var table = document.getElementById( 'headerTable' );
	                if(table != null) {
        	        	table.style.top = 0;
              		}

	                //ROJO IMAGE
        	        var rojo = document.getElementById( 'rojoBitches' );
                	if(rojo != null) {
                		//rojo.style.position = 'absolute';
	                        //rojo.style.bottom = 0;
        	                //rojo.style.left = 305;
	        	        //rojo.style.visibility = 'visible';
	                }
		}
	}
	window.background.mouse.handleResize();
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
