var ojoBackground;
var ojoFPS;
var ojo1;
var ojo2;

function homeClick() {
        window.location = "https://www.littlerojo.com/";
}

function aboutClick() {
        window.location = "https://www.littlerojo.com/about";
}

function getUnits(startDate) {
	var units = 0;

	<!--SECONDS 0/15/30/45-->
        if(startDate.second % 15 == 0) {
 	       units++;
        }

        <!--MINUTES 0/15/30/45-->
        if(startDate.minute % 15 == 0) {
        	units++;
        }

        <!--HOURS 0/3/6/9/12/15/18/21-->
        if(startDate.hour % 3 == 0) {
        	units++;
        }

        <!--MONTH 0/3/6/9/12-->
        if(startDate.month % 3 == 0) {
        	units++;
        }

        return units;
}

function onload() {
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
		<!-- if (document.cookie.indexOf("iphone_redirect=false") == -1) window.location = "http://m.espn.go.com/wireless/?iphone&i=COMR";-->
		var fps = document.getElementById("fps");
		fps.style.left = 100;
		fps.style.top = -2;		
	}

	ojoBackground = new Background();
	ojoBackground.init();
		
	ojoFPS = new FPS();
	ojoFPS.init();

	ojo1 = new _1();
	ojo1.init();

	ojo2 = new _2();
	ojo2.init();

	ojoBackground.animate();
}
