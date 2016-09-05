/*------------------------------------------------------------------------------------------*/
/*-----------------------------------------ELEMENTS-----------------------------------------*/
/*------------------------------*/

//-------------------WINDOW-\\

//-------------------DOCUMENT-\\

///////////////
///////  head.onload
///////////////
function onload() {	
	//GO
	var extJS = new loader(null, "js/me/" + this.mainCanvas.className + ".js", function() {
		var tojo = new tojo3();	
	});
		
	var extJS = new loader("function TEST() {\n var a = 1;\n var b = 2;\n }\n", "TEST.js");
	extJS.invoke();	
}

///////////////
///////  #rojo.onclick
///////////////
function rojoonclick() {
	//GET FRAME ELEMENTS
	var mainPage = document.getElementById('mainPageCell');
	var attributes = document.getElementById('AttributesCell');
	var code = document.getElementById('codeCell');	

	//SHOW AND RESIZE FRAMES
	if(mainPage.style.width == "100%") {
		mainPage.style.width = "30%";
		attributes.style.width = "25%";
		code.style.width = "45%";
	}
	//HIDE AND RESIZE FRAMES
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

//----------------------OTHER-\\

/*------------------------------*/
/*-----------------------------------------EVENTS-----------------------------------------*/
/*------------------------------*/

//----------------------WINDOW-\\

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