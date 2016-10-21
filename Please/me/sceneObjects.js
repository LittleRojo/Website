function hemiLight() {
    hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, .4 );
    hemiLight.position.set( -1, 0, 0 );
    //hemiLight.castShadow = true;
    scene.add( hemiLight );
}

function directionalLight() {
    dirLight = new THREE.DirectionalLight( 0xffffff, .6 );
    dirLight.position.set( 0, 10, 10 );
    dirLight.castShadow = true;
    dirLight.shadowMapWidth = 2048;
    dirLight.shadowCameraRight = 100;
    dirLight.shadowCameraLeft = -100;
    dirLight.shadowCameraTop = 100;
    dirLight.shadowCameraBottom = -100;
    dirLight.shadowMapHeight = 2048;
    //dirLight.shadowDarkness = 0.5;
    scene.add( dirLight );
}

function spotLight() {
    spotLight = new THREE.SpotLight( 0xffffff, .8 );
    spotLight.position.set( 0,15,-10 );
    spotLight.shadowMapWidth = 2048;
    spotLight.shadowMapWidth = 2048;
    scene.add(spotLight);
}

function ground() {
    var groundGeo = new THREE.PlaneGeometry( 5000, 5000, 70, 70 );
    /*for(var a = 0, b = groundGeo.vertices.length; a < b; a++ ){
        var factor = 25;
        if(groundGeo.vertices[a].x > 400 || groundGeo.vertices[a].x < -400 || groundGeo.vertices[a].z > 400 || groundGeo.vertices[a].z < -400) {
            factor = 100;
        }
        groundGeo.vertices[a].z = Math.random() * factor;
    }*/
    var groundMat = new THREE.MeshPhongMaterial( { color: 0x696969, specular: 0x050505, side: THREE.DoubleSide } );
    
    var ground = new THREE.Mesh( groundGeo, groundMat );
    ground.rotation.x = -Math.PI/2;
    ground.rotation.z = -deg(45);
    //ground.position.z = -10;
    ground.receiveShadow = true;
    scene.add( ground ); 
}

function sky() {
    var vertexShader = document.getElementById( 'vertexShader' ).textContent;
    var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
    var uniforms = {
        topColor:    { value: new THREE.Color( 0x000000 ) },
        bottomColor: { value: new THREE.Color( 0x001C49 ) },
        offset:      { value: 33 },
        exponent:    { value: .4 }
    };
    
    var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
    skyGeo.phiStart = 0;
    skyGeo.phiLength = deg(100);
    skyGeo.thetaStart = 0;
    skyGeo.thetaLength = deg(100);
    //var texture = new THREE.TextureLoader().load( "img/transperant.png" );
    var skyMat = new THREE.ShaderMaterial( {
    //var skyMat = new THREE.MeshPhongMaterial( { 
        vertexShader: vertexShader, 
        fragmentShader: fragmentShader, 
        uniforms: uniforms, 
        color: 0x00FFFF,
        side: THREE.FrontSide,
        //shading: THREE.FlatShading,
        //transperant: true,        
        //map: texture,
    });

    var sky = new THREE.Mesh( skyGeo, skyMat );
    scene.add( sky );
}

function stars() {
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
    scene.add(particleSystem);
}

function capSpireLogo() {
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

function capSpireName() {
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
        
        /*var mesh = new THREE.Mesh( geometryI, material );
        mesh.position.x = 78;
        mesh.position.y = 18;
        mesh.position.z = 0;
        mesh.rotation.y = Math.PI * 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        App.tojo.groupName.add( mesh );        
        scene.add( App.tojo.groupName );*/
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

function clouds() {
    //scene.fog = new THREE.Fog( 0xffffff, 100, 5000 );
    //scene.fog = new THREE.FogExp2( 0Xffffff, 0.00025 );
}

function sun() {
    //FULL CIRCLE
    //var geometry = new THREE.CircleGeometry(20,250,0,6.282);

    //CUSTOM
    //var geometry = new THREE.CircleGeometry(5,100,6.282);
    
    //3D
    var geometry = new THREE.SphereGeometry(1000, 10, 10);
    var material = new THREE.MeshPhongMaterial( { 
        //color: 0x945600, 
        side: THREE.DoubleSide ,
        map: THREE.ImageUtils.loadTexture("img/sun.png"),
        bumpmap: THREE.ImageUtils.loadTexture("img/grass.png"),
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = -50;
    mesh.position.y = 20000;
    mesh.position.z = -50000;
    scene.add(mesh);

    //LIGHT FROM
    var spotLight = new THREE.AmbientLight( 0xffffff, .4 );
    spotLight.position.set( 0,100,-200 );
    scene.add(spotLight);

    //LIGHT TO
    var directionalLight = new THREE.PointLight( 0xfeffad, 1.8 );
    directionalLight.target = mesh;
    directionalLight.position.set( -50,20000,-46000 );
    scene.add(directionalLight);
}

function carpet() {
    var groundGeo = new THREE.PlaneGeometry( 25, 30, 10, 10 );    
    var groundMat = new THREE.MeshPhongMaterial( { color: 0x696969, side: THREE.DoubleSide } );
    
    var ground = new THREE.Mesh( groundGeo, groundMat );
    //ground.rotation.x = -Math.PI/2;
    //ground.rotation.z = deg(25);
    //ground.position.z = -10;
    ground.receiveShadow = true;
    scene.add( ground ); 
}

function desk() {    

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
    scene.add( mesh );
    

    //App.orbitControls.target = mesh.position;
    /*var geometry = new THREE.SphereGeometry(1000, 10, 10);
    var material = new THREE.MeshPhongMaterial( { 
        color:0xFF0000, 
    });
    var mesh = new THREE.Mesh(geometry, material);
    //mesh.position.x = -5;
    //mesh.position.y = 10;
    //mesh.position.z = -10;
    scene.add(mesh);*/

    //var spotLight = new THREE.AmbientLight( 0xffffff, 10.4 );
    //spotLight.position.set( 0,0,0 );
    //scene.add(spotLight);
}