/*------------------------------------------------------------------------------------------*/
/*-----------------------------------------ELEMENTS-----------------------------------------*/
/*------------------------------*/

//-------------------WINDOW-\\

//-------------------DOCUMENT-\\

///////////////
///////  head.onload
///////////////
function bodyonload() {
	//Navigation - IPHONE WEB APP STUFF
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
	}

	//#documentHead DOCUMEHT HEAD
    this.documentHead = document.getElementById( 'documentHead' );

	//WINDOW OBJECTS
    this.mainCanvas = document.getElementById( 'mainCanvas'  );

	if(this.mainCanvas != null) {
	    this.mainContext = mainCanvas.getContext( 'webgl' );
	}

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
	
	//#navigationMenu.style.top - NAVIGATION MENU
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
}

//----------------------OTHER-\\

/*------------------------------*/
/*-----------------------------------------EVENTS-----------------------------------------*/
/*------------------------------*/

//----------------------WINDOW-\\

///////////////
///////  window.onresize
///////////////
window.onresize = windowonresize;
function windowonresize() {	
	//IPHONE CLIENT
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

//--------------------DOCUMENT-\\

///////////////  
///////  *.click - Link Behavior
///////////////
(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(chref=d.href).replace(e.href,"").indexOf("#")&&(!/^[a-z\+\.\-]+:/i.test(chref)||chref.indexOf(e.protocol+"//"+e.host)===0)&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone");

//----------------------OTHER-\\

///////////////  
///////  .script - Google Analytics
///////////////
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-80236281-1', 'auto');
ga('send', 'pageview');

/*------------------------------*/
/*----------------------------------------------------------------------------------------*/