/*------------------------------------------------------------------------------------------*/
/*-----------------------------------------ELEMENTS-----------------------------------------*/
/*------------------------------*/

//-------------------WINDOW-\\

//-------------------DOCUMENT-\\

///////////////
///////  head.onload
///////////////
function bodyonload() {
	//IPHONE WEB APP STUFF
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
	
		//IPHONE ORIENTATION - PROFILE
		if(window.orientation === 90 || window.orientation === -90) {
		}

		//IPHONE ORIANTATION - LANDSCAPE
		else {  
			//MOVE HEADER TABLE
			var table = document.getElementById( 'tablesocialmedia' );
			if(table != null) {
				table.style.top = 20;
			}
		}
		
		//MOVE HEADER TABLE
                var table = document.getElementById( 'tablesocialmedia' );
                if(table != null) {
                        table.style.top = 20;
                }
	}
	
	//PAGE LAYOUT
	var table = document.getElementById( 'tablesocialmedia' );
	if(table != null) {
	        table.style.visibility = 'visible';
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