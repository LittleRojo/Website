var home;
var rojo;
var ojoBackground;
var ojoFPS;
var ojo1;
var ojo2;

function swapIframe(e) {
	var mine = document.getElementById("myFrame");
	var blog = document.getElementById("blogFrame");
	if(mine.hidden) {
		mine.hidden = false;
		blog.hidden = true;

		/*
		var req = new XMLHttpRequest();
		req.open('GET', 'https://www.littlerojo.com/archive/', false);
		req.send(null);
		if(req.status == 200) {
			mine.innerText = req.responseText;
		*/		
	}			
	else {
		mine.hidden = true;
		blog.hidden = false;
	
		/*
		var req = new XMLHttpRequest();
                req.open('GET', 'https://littlerojo.blogspot.com', false);
                req.send(null);
                if(req.status == 200) {
                        mine.innerText = req.responseText;
		*/                
	}			

	var evt = e ? e:window.event;
	evt.stopPropagation();
	evt.cancelBubble = true;
	evt.returnValue = false;
}

(function(a,b,c){if(c in b&&b[c]){var d,e=a.location,f=/^(a|html)$/i;a.addEventListener("click",function(a){d=a.target;while(!f.test(d.nodeName))d=d.parentNode;"href"in d&&(chref=d.href).replace(e.href,"").indexOf("#")&&(!/^[a-z\+\.\-]+:/i.test(chref)||chref.indexOf(e.protocol+"//"+e.host)===0)&&(a.preventDefault(),e.href=d.href)},!1)}})(document,window.navigator,"standalone");

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
	var fps = document.getElementById("2dcanvasFPS");
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {

		fps.style.left = 100;
                fps.style.top = -2;
	}
	else {

		fps.style.left = 13;
                fps.style.top = 0;
	}

	var page = document.getElementById("background");
	if(page.baseURI.includes('gallery') || page.baseURI.includes('games')) {
		fps.hidden = false;
	}
	else {
                fps.hidden = true;
	}

	ojoBackground = new Background()
        ojoBackground.init();

	ojoFPS = new FPS();
        ojoFPS.init();

	rojo = new Rojo();
	rojo.init();

	if(page.baseURI.includes('gallery')) {
		ojo1 = new _1();
		ojo1.init();

		ojo2 = new _2();
		ojo2.init();
	}
	else if(page.baseURI.includes('games')) {

	}
	else if(page.baseURI.includes('archive')) {

        }
	else if(page.baseURI.includes('admin')) {

        }	
	else { 
                home = new homeScreen();
		home.init();
        }

	ojoBackground.animate();
}
