var lightingScript = document.getElementById("me/App.Lighting.js");
loadScript( "me/App.Models.js", function() {
    if( lightingScript.onLoadedCallback != null ) {
        lightingScript.onLoadedCallback.call( self );
    }    
}, function() {
    if( lightingScript.onCompletedCallback != null ) {
        App.Lighting = new Lighting();
        lightingScript.onCompletedCallback.call( self );    
    }
} );

Lighting = function() {

}

Lighting.prototype.hemiLight = function( x, y, z, topColor, bottomColor, intensity ) {
    var hemiLight = new THREE.HemisphereLight( topColor, bottomColor, intensity );
    hemiLight.position.set( x, y, z );
    hemiLight.castShadow = true;
    return hemiLight;
}

Lighting.prototype.ambientLight = function( x, y, z, color, intensity ) {
    var ambientLight = new THREE.AmbientLight( color, intensity );
    ambientLight.position.set( x, y, z );
    return ambientLight;
}

Lighting.prototype.directionalLight = function( x, y, z, color, intensity ) {
    var dirLight = new THREE.DirectionalLight( color, intensity );
    dirLight.position.set( x, y, z );
    dirLight.castShadow = true;
    dirLight.shadowMapWidth = 2048;
    dirLight.shadowCameraRight = 100;
    dirLight.shadowCameraLeft = -100;
    dirLight.shadowCameraTop = 100;
    dirLight.shadowCameraBottom = -100;
    dirLight.shadowMapHeight = 2048;
    //dirLight.shadowDarkness = 0.5;
    return dirLight;
}

Lighting.prototype.spotLight = function( x, y, z, color, intensity ) {
    var spotLight = new THREE.SpotLight( color, intensity );
    spotLight.position.set( x, y, z );
    spotLight.shadowMapWidth = 2048;
    spotLight.shadowMapWidth = 2048;
    return spotLight;
}

Lighting.prototype.lightFromSun = function( x, y, z, color, intensity ) {
    var sunLight = new THREE.AmbientLight( color, intensity );
    sunLight.position.set( x, y, z );
    return sunLight;
}

Lighting.prototype.lightToSun = function( x, y, z, color, intensity, target ) {
    var pointLight = new THREE.PointLight( color, intensity );
    pointLight.target = target;
    pointLight.position.set( x, y, z );
    return pointLight;
}