//WEB APP NAVIGATION
(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(chref=d.href).replace(e.href,"").indexOf("#")&&(!/^[a-z\+\.\-]+:/i.test(chref)||chref.indexOf(e.protocol+"//"+e.host)===0)&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone");

function onload() {
	//DOCUMEHT HEAD
        this.documentHead = document.getElementById( 'documentHead' );

	//WINDOW OBJECTS
        this.mainCanvas = document.getElementById( 'mainCanvas'  );

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
			var table = document.getElementById( 'socialMediaMenu' );
			if(table != null) {
				table.style.top = 20;
			}
		}
		
		//MOVE HEADER TABLE
                var table = document.getElementById( 'socialMediaMenu' );
                if(table != null) {
                        table.style.top = 20;
                }
	}
	
	//NAVIGATION MENU
	var table = document.getElementById( 'navigationMenu' );
	if(table != null) {
		table.style.top = window.innerHeight - 25;
	}

	//PAGE LAYOUT
	var table = document.getElementById( 'socialMediaMenu' );
	if(table != null) {
	        table.style.visibility = 'visible';
	}

	this.mainCanvas = document.getElementById( 'mainCanvas' );
	if(this.mainCanvas != null) {
	        this.mainContext = mainCanvas.getContext( 'webgl' );
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
	
	//GO
	if(window.location.pathname.includes("/index.html") || window.location.pathname == "/" || window.location.pathname.includes("archive")) {
		//var extJS = new loader(null, "js/me/" + this.mainCanvas.className + ".js", function() {
			//var tojo = new tojo3();	
		//});
		
		//var extJS = new loader("function TEST() {\n var a = 1;\n var b = 2;\n }\n", "TEST.js");
		//extJS.invoke();
	}
	else if(window.location.pathname == "/gallery.html") {

        }
	else if(window.location.pathname == "/games.html") {

        }
	else if(window.location.pathname == "/archive.html") {

        }
	else if(window.location.pathname == "/admin.html") {

        }
}

function onSizeChange() {
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

function rojoClick() {
	var mainPage = document.getElementById('mainPageCell');
	var attributes = document.getElementById('AttributesCell');
	var code = document.getElementById('codeCell');	

	if(mainPage.style.width == "100%") {
		mainPage.style.width = "30%";
		attributes.style.width = "25%";
		code.style.width = "45%";
	}
	else {
		mainPage.style.width = "100%";
		attributes.style.width = "0%";
		code.style.width = "0%";
	}

	var main = document.getElementById("mainPageCell");
	for (var index = 0; index < document.all.length; index++) {
		document.all[index].onmousedown = function() {
			this.style.background = "yellow";
		};
	}
}