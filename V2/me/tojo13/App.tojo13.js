var tojoScript = document.getElementById("me/tojo13/App.tojo13.js");
loadScript( "me/9-App.Xtra.js", function() {  
    if( tojoScript.onLoadedCallback != null ) {
        tojoScript.onLoadedCallback.call( self );
    }        
}, function() {
    if( tojoScript.onCompletedCallback != null ) {
        App.tojo = new tojo13();
        App.tojo.load();
        tojoScript.onCompletedCallback.call( self );
    }
} );

var tojo13 = function() {

}

tojo13.prototype.load = function() {
    App.tojo.frontWall = App.Models.plane( {
        x: 0,
        y: 0,
        z: -5,
        width: 10,
        height: 10, 
        color: 0x0FF000, 
        specular: 0x0000FF,
    });
    //App.scene.add( App.tojo.frontWall );

    App.tojo.rojo = App.Models.sphere( {
        x: 0, 
        y: 0, 
        z: -10, 
        color: 0xFF0000,
        uniformTopColor: 0x0F0F0F,
        uniformBottomColor: 0xF0F0F0,
    } );
	//App.scene.add( App.tojo.rojo );

    App.tojo.room = App.Models.box( {
        x: 0,
        y: 0,
        z: -30,
        width: 25,
        height: 25,
        depth: 25,
        color: 0xFFF00F,
    } );
    App.scene.add( App.tojo.room );

    //App.orbitControls.target = App.sightLine;
}

tojo13.prototype.updateLights = function( delta ) {
	
}

tojo13.prototype.updateModels = function( delta ) {
    
}
  
var counter = 0;
tojo13.prototype.updateCamera = function( delta ) {
    var factor = 50;
    var xStrength = App.leftJoystick._distanceX * .01;
    var yStrength = App.leftJoystick._distanceY * .01;
    if( App.leftJoystick.right() ){
        App.camera.translateX(factor * delta * xStrength);
    }
    if( App.leftJoystick.left() ){
        App.camera.translateX(-factor * delta * xStrength);        
    }
    if( App.leftJoystick.up() ){
        App.camera.translateZ(-factor * delta * yStrength);
    }
    if( App.leftJoystick.down() ){
        App.camera.translateZ(factor * delta * yStrength);
    }
    
    var xStrength = App.rightJoystick._distanceX;
    var yStrength = App.rightJoystick._distanceY;
    if( App.rightJoystick.up() ){
        App.camera.rotation.x += ( deg(factor * .4 * xStrength * delta) );
    }
    if( App.rightJoystick.down() ){
        App.camera.rotation.x += ( -deg(factor * .4 * xStrength * delta) );
    }
    if( App.rightJoystick.right() ){
        App.camera.rotation.y += ( -deg(factor * .4 * yStrength * delta) );
    }
    if( App.rightJoystick.left() ){
        App.camera.rotation.y += ( deg(factor * .4 * yStrength * delta) );
    }

    if( App.mobileOrientation !== undefined ) {
        App.camera.rotation.setFromRotationMatrix( App.mobileOrientation.x, App.mobileOrientation.y, App.camera.rotation.z += App.mobileOrientation.z );
        //App.camera.rotation.x += App.mobileOrientation.x;
        //App.camera.rotation.y += App.mobileOrientation.y;
        //App.camera.rotation.z += App.mobileOrientation.z;
    }
}