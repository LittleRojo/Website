var canvas;
var gl;

var cubeVerticesBuffer;
var cubeVerticesColorBuffer;
var cubeVerticesIndexBuffer;
var cubeVerticesIndexBuffer;
var cubeRotation = 0.0;
var cubeXOffset = 0.0;
var cubeYOffset = 0.0;
var cubeZOffset = 0.0;
var lastCubeUpdateTime = 0;
var xIncValue = 0.2;
var yIncValue = -0.4;
var zIncValue = 0.3;

var mvMatrix;
var shaderProgram;
var vertexPositionAttribute;
var vertexColorAttribute;
var perspectiveMatrix;

var mvMatrixStack = [];

//ME
var zCoord = -2;
var zDirection = 0;

var Rojo = function (parentId) {
        var rojoPanel = new Rojo.Panel( parentId );

        return {
                update: function () {
			rojoPanel.update( parentId );
                },
        };
};

Rojo.Panel = function ( parentId ) {
	canvas = document.getElementById( parentId );
  	initWebGL(canvas);  

	if (gl) {
		gl.clearColor(0.0, 0.0, 0.0, 0.0);
		gl.clearDepth(1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.enable(gl.DEPTH_TEST); 
		gl.depthFunc(gl.LEQUAL); 

		initShaders();
		initBuffers();
  	}

        return {
                dom: canvas,
                update: function ( value ) {
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			perspectiveMatrix = makePerspective(45, 640.0/480.0, 0.1, 100.0);
			loadIdentity();
			
			mvTranslate([-0.0, 0.0, -4.5]);
			mvPushMatrix();
			
			//mvTranslate([ 0, 0, zCoord ]);
			mvRotate(cubeRotation, [ 0, 1, 1]);			
			/*
			if(zDirection == 1) {
				zCoord += .01;
				if(zCoord >= -2) {
					zDirection = 0;
				}
			}
			else {
				zCoord -= .01;
				if(zCoord <= -4) {
                                        zDirection = 1;
                                }
			}
			*/

			gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesBuffer);
			gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

			gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesColorBuffer);
			gl.vertexAttribPointer(vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);
			setMatrixUniforms();
				
			gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

			mvPopMatrix();
			var currentTime = (new Date).getTime();
			if (lastCubeUpdateTime) {
				var delta = currentTime - lastCubeUpdateTime;
			    	cubeRotation += (180 * delta) / 1000.0;
			}	
			lastCubeUpdateTime = currentTime;		
                }
        };
};

if ( typeof module === 'object' ) {
        module.exports = Rojo;
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

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just have
// one object -- a simple two-dimensional square.
//
function initBuffers() {
	// Create a buffer for the cube's vertices.
  	cubeVerticesBuffer = gl.createBuffer();

  	// Select the cubeVerticesBuffer as the one to apply vertex
  	// operations to from here out.
  	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesBuffer);

  	// Now create an array of vertices for the cube.
  	var vertices = [
    	
		// Front face
	    	-1.0, -1.0,  1.0,
	     	1.0, -1.0,  1.0,
	     	1.0,  1.0,  1.0,
	    	-1.0,  1.0,  1.0,

	    	// Back face
	    	-1.0, -1.0, -1.0,
	    	-1.0,  1.0, -1.0,
	     	1.0,  1.0, -1.0,
	     	1.0, -1.0, -1.0,

	    	// Top face
    		-1.0,  1.0, -1.0,
	    	-1.0,  1.0,  1.0,
	     	1.0,  1.0,  1.0,
	     	1.0,  1.0, -1.0,

	    	// Bottom face
	    	-1.0, -1.0, -1.0,
	     	1.0, -1.0, -1.0,
	     	1.0, -1.0,  1.0,
	    	-1.0, -1.0,  1.0,

	    	// Right face
	     	1.0, -1.0, -1.0,
	     	1.0,  1.0, -1.0,
	     	1.0,  1.0,  1.0,
	     	1.0, -1.0,  1.0,

	    	// Left face
	    	-1.0, -1.0, -1.0,
    		-1.0, -1.0,  1.0,
	    	-1.0,  1.0,  1.0,
	    	-1.0,  1.0, -1.0
  	];

  	// Now pass the list of vertices into WebGL to build the shape. We
  	// do this by creating a Float32Array from the JavaScript array,
  	// then use it to fill the current vertex buffer.
  	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  	// Now set up the colors for the faces. We'll use solid colors
  	// for each face.
  	var colors = [
    		[1.0,  1.0,  1.0,  1.0],    // Front face: white
		[1.0,  0.0,  0.0,  1.0],    // Back face: red
    		[0.0,  1.0,  0.0,  1.0],    // Top face: green
    		[0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
    		[1.0,  1.0,  0.0,  1.0],    // Right face: yellow
    		[1.0,  0.0,  1.0,  1.0]     // Left face: purple
  	];

  	// Convert the array of colors into a table for all the vertices.
  	var generatedColors = [];

  	for (j=0; j<6; j++) {
    		var c = colors[j];

    		// Repeat each color four times for the four vertices of the face
    		for (var i=0; i<4; i++) {
      			generatedColors = generatedColors.concat(c);
    		}
  	}

  	cubeVerticesColorBuffer = gl.createBuffer();
  	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesColorBuffer);
  	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);

  	// Build the element array buffer; this specifies the indices
  	// into the vertex array for each face's vertices.
  	cubeVerticesIndexBuffer = gl.createBuffer();
  	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);

  	// This array defines each face as two triangles, using the
  	// indices into the vertex array to specify each triangle's
  	// position.
  	var cubeVertexIndices = [
    		0,  1,  2,      0,  2,  3,    // front
    		4,  5,  6,      4,  6,  7,    // back
    		8,  9,  10,     8,  10, 11,   // top
    		12, 13, 14,     12, 14, 15,   // bottom
    		16, 17, 18,     16, 18, 19,   // right
    		20, 21, 22,     20, 22, 23    // left
  	]

  	// Now send the element array to GL
  	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
}

function initShaders() {
	var fragmentShader = getShader(gl, "shader-fs");
  	var vertexShader = getShader(gl, "shader-vs");

  	// Create the shader program
  	shaderProgram = gl.createProgram();
  	gl.attachShader(shaderProgram, vertexShader);
  	gl.attachShader(shaderProgram, fragmentShader);
  	gl.linkProgram(shaderProgram);

  	// If creating the shader program failed, alert
  	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    		alert("Unable to initialize the shader program: " + gl.getProgramInfoLog(shader));
  	}

  	gl.useProgram(shaderProgram);
  	vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	//gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false,0,0) ;
  	gl.enableVertexAttribArray(vertexPositionAttribute);
  	vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
	//gl.vertexAttribPointer(vertexColorAttribute, 3, gl.FLOAT, false,0,0) ;
  	gl.enableVertexAttribArray(vertexColorAttribute);
}

//
// getShader
//
// Loads a shader program by scouring the current document,
// looking for a script with the specified ID.
//
function getShader(gl, id) {
  	var shaderScript = document.getElementById(id);

  	// Didn't find an element with the specified ID; abort.
  	if (!shaderScript) {
    		return null;
  	}

  	// Walk through the source element's children, building the
  	// shader source string.
  	var theSource = "";
 	var currentChild = shaderScript.firstChild;

  	while(currentChild) {
    		if (currentChild.nodeType == 3) {
	      		theSource += currentChild.textContent;
    		}
    		currentChild = currentChild.nextSibling;
  	}

  	// Now figure out what type of shader script we have,
  	// based on its MIME type.
  	var shader;

  	if (shaderScript.type == "x-shader/x-fragment") {
    		shader = gl.createShader(gl.FRAGMENT_SHADER);
  	} else if (shaderScript.type == "x-shader/x-vertex") {
    		shader = gl.createShader(gl.VERTEX_SHADER);
  	} else {
    		return null;  // Unknown shader type
  	}

  	// Send the source to the shader object
  	gl.shaderSource(shader, theSource);

  	// Compile the shader program
  	gl.compileShader(shader);

  	// See if it compiled successfully
  	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    		alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
    		return null;
  	}

  	return shader;
}

//
// Matrix utility functions
//
function loadIdentity() {
  	mvMatrix = Matrix.I(4);
}

function multMatrix(m) {
  	mvMatrix = mvMatrix.x(m);
}

function mvTranslate(v) {
  	multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

function setMatrixUniforms() {
  	var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
  	gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

  	var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
  	gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
}

function mvPushMatrix(m) {
  	if (m) {
    		mvMatrixStack.push(m.dup());
    		mvMatrix = m.dup();
  	} else {
    		mvMatrixStack.push(mvMatrix.dup());
  	}
}

function mvPopMatrix() {
  	if (!mvMatrixStack.length) {
    		throw("Can't pop from an empty matrix stack.");
  	}

	mvMatrix = mvMatrixStack.pop();
  	return mvMatrix;
}

function mvRotate(angle, v) {
  	var inRadians = angle * Math.PI / 180.0;
  	var m = Matrix.Rotation(inRadians, $V([v[0], v[1], v[2]])).ensure4x4();
  	multMatrix(m);
}
