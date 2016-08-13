var canvas;
var gl;

var homeScreen = function (parentId) {
        var homeScreenPanel = new homeScreen.Panel( parentId );

        return {
                update: function () {
			homeScreenPanel.update( parentId );
                },
        };
};

homeScreen.Panel = function ( parentId ) {
	canvas = document.getElementById( parentId );
  	initWebGL(canvas);  

	if (gl) {
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
  	}

        return {
                dom: canvas,
                update: function ( value ) {
			//gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            	}
        };
};

if ( typeof module === 'object' ) {
        module.exports = homeScreen;
}

function initWebGL() {
	gl = null;

	try {
    		gl = canvas.getContext("experimental-webgl");
  	}
  	catch(e) {
  	}

  	// If we don't have a GL context, give up now
  	if (!gl) {
    		alert("Unable to initialize WebGL. Your browser may not support it.");
  	}
}
