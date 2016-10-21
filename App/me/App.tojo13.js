tojo13 = function() {
    Scene.call( this );
}

tojo13.prototype = Object.create( Scene.prototype );
tojo13.prototype.constructor = tojo13;

tojo13.prototype.load = function() {
    var frontWall = this.getPlane( {
        x: 0,
        y: 0,
        z: 15,
        width: 100,
        height: 100, 
        color: 0x0FF000, 
        specular: 0x0000FF,
    });
    frontWall.rotateX( -deg( 90 ) );
    this.add( frontWall );

    for(var i = 0; i < 100; i++ ){
        var room = this.getBox( {
            x: 5 * i,
            y: 0,
            z: -30,
            width: 25,
            height: 25,
            depth: 25,
            color: 0xFFF00F,
        } );
        this.add( room );
    }

    //App.orbitControls.target = App.sightLine;
}

tojo13.prototype.updateLights = function( delta ) {
	
}

tojo13.prototype.updateModels = function( delta ) {
    
}
  
tojo13.prototype.updateCamera = function( delta ) {
    /*var factor = 50;
    var xStrength = App.leftJoystick._distanceX * .009;
    var yStrength = App.leftJoystick._distanceY * .009;
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
    var rotation = factor * .009 * xStrength * delta;
    if( App.rightJoystick.up() && rotation < 10 ) {
        App.camera.translateY( rotation );
    }
    if( App.rightJoystick.down() && rotation  < 15 ){
        App.camera.translateY( -rotation );
    }
    if( App.rightJoystick.right() ){
        App.camera.rotation.y += ( -deg( rotation ) );
    }
    if( App.rightJoystick.left() ){
        App.camera.rotation.y += ( deg( rotation ) );
    }*/
}