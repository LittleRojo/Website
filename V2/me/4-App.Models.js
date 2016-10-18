var modelScript = document.getElementById("me/4-App.Models.js");
loadScript( "me/3-App.Lighting.js", function() {
    if( modelScript.onLoadedCallback != null ) {
        modelScript.onLoadedCallback.call( self );
    }    
}, function() {
    if( modelScript.onCompletedCallback != null ) {
        App.Models = new Models();
        modelScript.onCompletedCallback.call( self );    
    }
} );

Models = function() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.color = 0xFFFFFF;
    this.uniformTopColor = 0xFFFFFF;
    this.uniformBottomColor = 0xFFFFFF;
    this.specular = 0x000000;
    this.width = 1;
    this.height = 1;
    this.depth = 1;

    Models.prototype.set = function(parameters) {
        this.x = parameters.x;
        this.y = parameters.y;
        this.z = parameters.z;
        this.color = parameters.color;
        this.uniformTopColor = parameters.uniformTopColor;
        this.uniformBottomColor = parameters.uniformBottomColor;
        this.specular = parameters.specular;
        this.width = parameters.width;
        this.height = parameters.height;
        this.depth = parameters.depth;
    }  
}

Models.prototype.plane = function( parameters ) {
    this.set( parameters );
    var planeGeometry = new THREE.PlaneGeometry( this.width, this.height, this.width / 2, this.width / 2 );
    /*for(var a = 0, b = planeGeometry.vertices.length; a < b; a++ ){
        var factor = 25;
        if(planeGeometry.vertices[a].x > 400 || planeGeometry.vertices[a].x < -400 || planeGeometry.vertices[a].z > 400 || planeGeometry.vertices[a].z < -400) {
            factor = 100;
        }
        planeGeometry.vertices[a].z = Math.random() * factor;
    }*/
    var planeMaterial = new THREE.MeshBasicMaterial( { 
        color: this.color, 
        specular: this.specular, 
        side: THREE.DoubleSide,
    } );
    
    var plane = new THREE.Mesh( planeGeometry, planeMaterial );
    //plane.rotation.x = -Math.PI/2;
    //plane.rotation.z = -deg(45);
    //plane.position.z = -10;
    //plane.receiveShadow = true;
    return plane;
}

Models.prototype.sphere = function( parameters ) {
    this.set( parameters );

    var vertexShader = App.Shaders.skyVertex();
    var fragmentShader = App.Shaders.skyFragment();
    var uniforms = {
        //topColor:    { value: this.uniformTopColor },
        //bottomColor: { value: this.uniformBottomColor },
        offset:      { value: 33 },
        exponent:    { value: .4 }
    };
    
    var sphereGeometry = new THREE.SphereGeometry( this.x, this.y, this.z );
    sphereGeometry.phiStart = 0;
    sphereGeometry.phiLength = deg(100);
    sphereGeometry.thetaStart = 0;
    sphereGeometry.thetaLength = deg(100);
    //var texture = new THREE.TextureLoader().load( "img/transperant.png" );
    var sphereMaterial = new THREE.ShaderMaterial( {
        vertexShader: vertexShader, 
        fragmentShader: fragmentShader, 
        uniforms: uniforms, 
        color: this.color,
        side: THREE.FrontSide,
        //shading: THREE.FlatShading,
        //transperant: true,        
        //map: texture,
    });

    var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    return sphere;
}

Models.prototype.box = function( parameters ) {
    this.set( parameters );
    var boxGeometry = new THREE.BoxGeometry( this.width, this.height, this.depth );
    var boxMaterial = new THREE.MeshBasicMaterial( {
        color: this.color,
    });
    var box = new THREE.Mesh( boxGeometry, boxMaterial );
    box.position.set( this.x, this.y, this.z );
    return box;
}

/*
Models.prototype.stars = function() {
    var stars = 1000;
    var counter = 0;
    var pixels = new Pixel({
        position: new Float32Array( stars * 3 ),
        color: [],
        size: new Float32Array( stars )
    });
    var geometry = new THREE.Geometry();				
    geometry.verticesNeedUpdate = true;
    geometry.normalsNeedUpdate = true;
    geometry.colorsNeedUpdate = true;
    geometry.uvsNeedUpdate = true;
    for(var x = 0; x < stars; x++){
        pixels.position[ 3 * counter ] = 100000 * Math.cos((Math.random() / 3 * 1000) * (Math.PI / 180));//(Math.random() - .5) * -10000;		
        pixels.position[ 3 * counter + 1 ] =  100000 * Math.sin((Math.random() / 3 * 1000) * (Math.PI / 180));//(Math.random() - .5) * 10000;
        pixels.position[ 3 * counter + 2 ] = (Math.random() - .5) * 1000000;

        pixels.size[counter] = 100;

        var spot = new THREE.Vector3(pixels.position[ 3 * counter ], pixels.position[ 3 * counter + 1 ], pixels.position[ 3 * counter + 2 ])	
        geometry.vertices.push(spot)
        counter++;
    }

    var material = new THREE.PointsMaterial( 
    {
        color: 0xffffff,
        size: 1000.883397,
        map: THREE.ImageUtils.loadTexture('img/star.png'),
        opacity: 1,
        transparent: true
    });
    
    var particleSystem = new THREE.Points(geometry, material);
    particleSystem.shading = THREE.FlatShading;
    return particleSystem;
}

Models.prototype.capSpireLogo = function() {
    App.tojo.logoGroup = new THREE.Group();

    //MIDDLE YELLO
	var geometry = new THREE.CylinderGeometry( 0, 2.1, 7.0, 1000 );
    var material = new THREE.MeshPhongMaterial( {color: 0xFFCF00, side: THREE.DoubleSide } );
    App.tojo.yellow = new THREE.Mesh( geometry, material );
    App.tojo.yellow.rotation.z = deg(34);
    App.tojo.yellow.position.x = 4.4;
    App.tojo.yellow.position.y = .5;  
    App.tojo.yellow.shading = true;
    App.tojo.yellow.castShadow = true;
    App.tojo.yellow.receiveShadow = true;  
    App.tojo.logoGroup.add(App.tojo.yellow);
    
    //GREEN BODY    
    var pts = [];
    pts.push( new THREE.Vector3( 7.1, -6.5,0 ));
    pts.push( new THREE.Vector3( 8.05, -1.2,0 ));
    pts.push( new THREE.Vector3( -1.5,6.5,0 ));
    pts.push( new THREE.Vector3( 0.8,-1.0,0 ));
    var shape = new THREE.Shape( pts );
    var geometry2 = new THREE.ShapeGeometry( shape );
    var material2 = new THREE.MeshPhongMaterial( { color: 0xC1CD23, side: THREE.DoubleSide, shading: THREE.SmoothShading } );    
    App.tojo.green = new THREE.Mesh( geometry2, material2 );  
    App.tojo.green.shading = true;  
    App.tojo.green.castShadow = true;
    App.tojo.green.receiveShadow = true;
    App.tojo.logoGroup.add(App.tojo.green);

    //ORANGE BODY - RIGHT    
    var pts = [];
    pts.push( new THREE.Vector3( 6.65, -1.5,0 ));
    pts.push( new THREE.Vector3( 10.1, 0, 0 ));    
    pts.push( new THREE.Vector3( 10.8, 7.0,0 ));
    pts.push( new THREE.Vector3( 1.7,3.1,0 ));
    var shape2 = new THREE.Shape( pts );
    var geometry3 = new THREE.ShapeGeometry( shape2 );
    var material3 = new THREE.MeshPhongMaterial( { color: 0xFF7F00, side: THREE.DoubleSide, shading: THREE.SmoothShading } );    
    App.tojo.orangeLeft = new THREE.Mesh( geometry3, material3 );  
    App.tojo.orangeLeft.shading = true;  
    App.tojo.orangeLeft.rotation.x = deg(-20);
    App.tojo.orangeLeft.rotation.y = deg(25);
    App.tojo.orangeLeft.translateZ(2.0);
    App.tojo.orangeLeft.castShadow = true;
    App.tojo.orangeLeft.receiveShadow = true;
    App.tojo.logoGroup.add(App.tojo.orangeLeft);

    //ORANGE BODY - LEFT 
    var pts = [];
    pts.push( new THREE.Vector3( 6.65, -1.5,0 ));
    pts.push( new THREE.Vector3( 10.1, 0,0 ));    
    pts.push( new THREE.Vector3( 10.8, 7.0,0 ));
    pts.push( new THREE.Vector3( 1.7,3.1,0 ));
    var shape3 = new THREE.Shape( pts );
    var geometry4 = new THREE.ShapeGeometry( shape3 );
    var material4 = new THREE.MeshPhongMaterial( { color: 0xFF7F00, side: THREE.DoubleSide, shading: THREE.SmoothShading } );    
    App.tojo.orangeRight = new THREE.Mesh( geometry4, material4 );  
    App.tojo.orangeRight.shading = true;  
    App.tojo.orangeRight.rotation.x = deg(20);
    App.tojo.orangeRight.rotation.y = deg(-25);
    App.tojo.orangeRight.translateZ(-2.0);
    App.tojo.orangeRight.castShadow = true;
    App.tojo.orangeRight.receiveShadow = true;
    App.tojo.logoGroup.add(App.tojo.orangeRight);

    //App.tojo.logoGroup.translateX(-4.4);
    App.tojo.logoGroup.translateY(15);
    //App.tojo.logoGroup.translateZ(40.6);

    App.tojo.all.add( App.tojo.logoGroup );
}

Models.prototype.capSpireName = function() {
    App.tojo.groupName = new THREE.Group();
    var loader = new THREE.FontLoader();
    loader.load( 'fonts/helvetiker.json', function ( font ) {
        var geometryC = new THREE.TextGeometry( "c", {
            font: font,
            size: 20,
            height: 2,
            curveSegments: 2
        });

        var geometryA = new THREE.TextGeometry( "a", {
            font: font,
            size: 20,
            height: 2,
            curveSegments: 2
        });

        var geometryP = new THREE.TextGeometry( "p", {
            font: font,
            size: 20,
            height: 2,
            curveSegments: 2
        });

        var geometryS = new THREE.TextGeometry( "S", {
            font: font,
            size: 20,
            height: 2,
            curveSegments: 2
        });

        var geometryP = new THREE.TextGeometry( "p", {
            font: font,
            size: 20,
            height: 2,
            curveSegments: 2
        });

        var geometryI = new THREE.TextGeometry( "i", {
            font: font,
            size: 20,
            height: 2,
            curveSegments: 2
        });

        var geometryR = new THREE.TextGeometry( "r", {
            font: font,
            size: 20,
            height: 2,
            curveSegments: 2
        });

        var geometryE = new THREE.TextGeometry( "e", {
            font: font,
            size: 20,
            height: 2,
            curveSegments: 2
        });        

        //NAME LETTERS
        var material = new THREE.MultiMaterial( [
            new THREE.MeshBasicMaterial( { color: 0x8B9B93, overdraw: 0.1 } ),
            new THREE.MeshBasicMaterial( { color: 0x000000, overdraw: 0.9 } )
        ]);
                
        App.tojo.groupName = new THREE.Group();
        var mesh = new THREE.Mesh( geometryC, material );
        mesh.position.x = 0;
        mesh.position.y = 18;
        mesh.position.z = 0;
        //mesh.rotation.y = Math.PI * 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;        
        App.tojo.groupName.add( mesh );        
 
        var mesh = new THREE.Mesh( geometryA, material );
        mesh.position.x = 15;
        mesh.position.y = 18;
        mesh.position.z = 0;
        //mesh.rotation.y = Math.PI * 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        App.tojo.groupName.add( mesh );        
       
        var mesh = new THREE.Mesh( geometryP, material );
        mesh.position.x = 31;
        mesh.position.y = 18;
        mesh.position.z = 0;
        //mesh.rotation.y = Math.PI * 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        App.tojo.groupName.add( mesh );        
       
        var mesh = new THREE.Mesh( geometryS, material );
        mesh.position.x = 46;
        mesh.position.y = 18;
        mesh.position.z = 0;
        //mesh.rotation.y = Math.PI * 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        App.tojo.groupName.add( mesh );        
       
        var mesh = new THREE.Mesh( geometryP, material );
        mesh.position.x = 63;
        mesh.position.y = 18;
        mesh.position.z = 0;
        //mesh.rotation.y = Math.PI * 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        App.tojo.groupName.add( mesh );       
        
        var i = new THREE.BoxGeometry(2.2, 14.9, 2);
        var material2 = new THREE.MeshBasicMaterial( { color: 0x8B9B93 } );
        var mesh2 = new THREE.Mesh(i, material2);
        mesh2.position.x = 79.5;
        mesh2.position.y = 25.4;
        mesh2.position.z = 1;
        //mesh2.rotation.y = Math.PI * 2;
        mesh2.castShadow = true;
        mesh2.receiveShadow = true;
        App.tojo.groupName.add(mesh2);
        

        var mesh = new THREE.Mesh( geometryR, material );
        mesh.position.x = 83;
        mesh.position.y = 18;
        mesh.position.z = 0;
        //mesh.rotation.y = Math.PI * 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        App.tojo.groupName.add( mesh );        
        
        var mesh = new THREE.Mesh( geometryE, material );
        mesh.position.x = 90;
        mesh.position.y = 18;
        mesh.position.z = 0;
        //mesh.rotation.y = Math.PI * 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        App.tojo.groupName.add( mesh );        

        App.tojo.groupName.translateX(-45);      
        //App.tojo.groupName.rotateY(.09461);

        App.tojo.all.add( App.tojo.groupName );
    });
}

Models.prototype.clouds = function() {
    var fog = new THREE.Fog( 0xffffff, 100, 5000 );
    //var fog = new THREE.FogExp2( 0Xffffff, 0.00025 );
    return fog;
}

Models.prototype.sun = function() {
    var geometry = new THREE.SphereGeometry(1000, 10, 10);
    var material = new THREE.MeshPhongMaterial( { 
        color: 0x945600, 
        side: THREE.DoubleSide ,
        map: THREE.ImageUtils.loadTexture("img/sun.png"),
        bumpmap: THREE.ImageUtils.loadTexture("img/grass.png"),
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = -50;
    mesh.position.y = 20000;
    mesh.position.z = -50000;
    return mesh;
}

Models.prototype.carpet = function() {
    var groundGeo = new THREE.PlaneGeometry( 25, 30, 10, 10 );    
    var groundMat = new THREE.MeshPhongMaterial( { color: 0x696969, side: THREE.DoubleSide } );    
    var ground = new THREE.Mesh( groundGeo, groundMat );
    //ground.rotation.x = -Math.PI/2;
    //ground.rotation.z = deg(25);
    //ground.position.z = -10;
    ground.receiveShadow = true;
    return ground;
}

Models.prototype.desk = function() {
    var geometry = new THREE.BoxGeometry( 4, .1, 4.5 );
    var texture = THREE.ImageUtils.loadTexture("img/wood.jpg");
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 1, -10 );

    var material = new THREE.MeshBasicMaterial( {
        color: 0x8B4513,
        map: texture,
    } );
    var mesh = new THREE.Mesh( geometry, material );    
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    mesh.translateX(-6);
    mesh.translateY(2);
    mesh.translateZ(1.3);
    mesh.updateMatrix();
    mesh.rotateX(-deg(90));
    mesh.rotateY(deg(85));
    return mesh;
}
*/