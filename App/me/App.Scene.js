Scene = function() {    
    THREE.Scene.call( this );
}

Scene.prototype = Object.create( THREE.Scene.prototype );
Scene.prototype.constructor = Scene;

Scene.prototype.load = function() {

}  

Scene.prototype.updateFrame = function( delta ) {
    App.experience.updateLights( delta );
    App.experience.updateModels( delta );
    App.experience.updateCamera( delta );
}

Scene.prototype.getPlane = function( _ ) {
    var planeGeometry = new THREE.PlaneGeometry( _.width, _.height, _.width / 2, _.width / 2 );
    /*for(var a = 0, b = planeGeometry.vertices.length; a < b; a++ ){
        var factor = 25;
        if(planeGeometry.vertices[a].x > 400 || planeGeometry.vertices[a].x < -400 || planeGeometry.vertices[a].z > 400 || planeGeometry.vertices[a].z < -400) {
            factor = 100;
        }
        planeGeometry.vertices[a].z = Math.random() * factor;
    }*/
    var planeMaterial = new THREE.MeshBasicMaterial( {      
        color: _.color != undefined ? _.color : undefined,   
        specular: _.specular != undefined ? _.specular : undefined, 
        side: THREE.DoubleSide, 
        map: _.texture !== undefined ? _.texture : undefined,       
    } );
    
    var plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.position.x = _.x;
    plane.position.y = _.y;
    plane.position.z = _.z;
    //plane.receiveShadow = true;
    return plane;
}

Scene.prototype.getSphere = function( _ ) {
    var vertexShader = App.Shaders.skyVertex();
    var fragmentShader = App.Shaders.skyFragment();
    var uniforms = {
        //topColor:    { value: _.uniformTopColor },
        //bottomColor: { value: _.uniformBottomColor },
        offset:      { value: 33 },
        exponent:    { value: .4 }
    };
    
    var sphereGeometry = new THREE.SphereGeometry( _.x, _.y, _.z );
    sphereGeometry.phiStart = 0;
    sphereGeometry.phiLength = deg(100);
    sphereGeometry.thetaStart = 0;
    sphereGeometry.thetaLength = deg(100);
    //var texture = new THREE.TextureLoader().load( "img/transperant.png" );
    var sphereMaterial = new THREE.ShaderMaterial( {
        vertexShader: vertexShader, 
        fragmentShader: fragmentShader, 
        uniforms: uniforms, 
        color: _.color,
        side: THREE.FrontSide,
        //shading: THREE.FlatShading,
        //transperant: true,        
        //map: texture,
    });

    var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    return sphere;
}

Scene.prototype.getBox = function( _ ) {
    var boxGeometry = new THREE.BoxGeometry( _.width, _.height, _.depth );
    var boxMaterial = new THREE.MeshBasicMaterial( {
        color: _.color,
    });
    var box = new THREE.Mesh( boxGeometry, boxMaterial );
    box.position.set( _.x, _.y, _.z );
    return box;
}