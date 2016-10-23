var shaderScript = document.getElementById("me/2-App.Shaders.js");
loadScript( "me/1-App.js", function() {
    if( shaderScript.onLoadedCallback != null ) {
        shaderScript.onLoadedCallback.call( self );
    }    
}, function() {
    if( shaderScript.onCompletedCallback != null ) {
        App.Shaders = new Shaders();
        shaderScript.onCompletedCallback.call( self );    
    }
} );

Shaders = function() {
}

Shaders.prototype.skyVertex = function() {
    return  "varying vec3 vWorldPosition;" +
            "void main() {" + 
                "vec4 worldPosition = modelMatrix * vec4( position, 1.0 );" + 
                "vWorldPosition = worldPosition.xyz;" + 
                "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );" +
            "}";
}

Shaders.prototype.skyFragment = function() {
    return  "uniform vec3 topColor;" + 
			"uniform vec3 bottomColor;" + 
			"uniform float offset;" + 
			"uniform float exponent;" + 
			"varying vec3 vWorldPosition;" + 
			"void main() {" + 
				"float h = normalize( vWorldPosition + offset ).y;" + 
				"gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), .1 );" + 
			"}";
}