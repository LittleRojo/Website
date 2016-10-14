function tojo11() {
	this.name = "tojo11";
	this.fps = 0;
	this.sampleSize = 5;
	this.renderLengthQueue = [];
	this.previousRenderStamp;
	this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
}

tojo11.prototype.SetupScene = function() {

    this.sightLine = new THREE.Vector3( 0, 60.0,0 );
    //this.scene.fog = new THREE.Fog( 0xffffff, 1, 5000 );
    //this.scene.fog.color.setHSL( 0.6, 0, 1 );

    //LIGHTS
    hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, .4 );
    hemiLight.position.set( -1, 0, 0 );
    //hemiLight.castShadow = true;
    this.scene.add( hemiLight );

    dirLight = new THREE.DirectionalLight( 0xffffff, .6 );
    dirLight.position.set( 0, 5, 0 );
    dirLight.castShadow = true;
    dirLight.shadowMapWidth = 2048;
    dirLight.shadowCameraRight = 100;
    dirLight.shadowCameraLeft = -100;
    dirLight.shadowCameraTop = 100;
    dirLight.shadowCameraBottom = -100;
    dirLight.shadowMapHeight = 2048;
    //dirLight.shadowDarkness = 0.5;
    this.scene.add( dirLight );

    spotLight = new THREE.SpotLight( 0xffffff, .8 );
    spotLight.position.set( 0,100,0 );
    spotLight.shadowMapWidth = 2048;
    spotLight.shadowMapWidth = 2048;
    this.scene.add(spotLight);
    
    //GROUND
    var groundGeo = new THREE.PlaneGeometry( 10000, 10000, 70, 70 );
    for(var a = 0, b = groundGeo.vertices.length; a < b; a++ ){
        var factor = 25;
        if(groundGeo.vertices[a].x > 400 || groundGeo.vertices[a].x < -400 || groundGeo.vertices[a].z > 400 || groundGeo.vertices[a].z < -400) {
            factor = 100;
        }
        groundGeo.vertices[a].z = Math.random() * factor;
    }
    var groundMat = new THREE.MeshPhongMaterial( { color: 0x003300, specular: 0x050505 } );
    
    var ground = new THREE.Mesh( groundGeo, groundMat );
    ground.rotation.x = -Math.PI/2;
    ground.position.y = -33;
    ground.receiveShadow = true;
    this.scene.add( ground );    

    //DOME
    var vertexShader = document.getElementById( 'vertexShader' ).textContent;
    var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
    var uniforms = {
        topColor:    { value: new THREE.Color( 0x000000 ) },
        bottomColor: { value: new THREE.Color( 0x000000 ) },
        offset:      { value: 33 },
        exponent:    { value: 0.6 }
    };
    //uniforms.topColor.value.copy( 0x000000 );
    //this.scene.fog.color.copy( uniforms.bottomColor.value );

    var skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
    var skyMat = new THREE.ShaderMaterial( { 
        vertexShader: vertexShader, 
        fragmentShader: fragmentShader, 
        uniforms: uniforms, 
        side: THREE.BackSide,
        shading: THREE.FlatShading
    });

    var sky = new THREE.Mesh( skyGeo, skyMat );
    //this.scene.add( sky );

    //STARS
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
    this.scene.add(particleSystem);

    //LOGO
    this.all = new THREE.Group();
    this.logoGroup = new THREE.Group();

    //MIDDLE YELLO
	var geometry = new THREE.CylinderGeometry( 0, 2.1, 7.0, 1000 );
    var material = new THREE.MeshPhongMaterial( {color: 0xFFCF00, side: THREE.DoubleSide } );
    this.yellow = new THREE.Mesh( geometry, material );
    this.yellow.rotation.z = deg(34);
    this.yellow.position.x = 4.4;
    this.yellow.position.y = .5;  
    this.yellow.shading = true;
    this.yellow.castShadow = true;
    this.yellow.receiveShadow = true;  
    this.logoGroup.add(this.yellow);

    //GREEN BODY    
    var pts = [];
    pts.push( new THREE.Vector3( 7.1, -6.5,0 ));
    pts.push( new THREE.Vector3( 8.05, -1.2,0 ));
    pts.push( new THREE.Vector3( -1.5,6.5,0 ));
    pts.push( new THREE.Vector3( 0.8,-1.0,0 ));
    var shape = new THREE.Shape( pts );
    var geometry2 = new THREE.ShapeGeometry( shape );
    var material2 = new THREE.MeshPhongMaterial( { color: 0xC1CD23, side: THREE.DoubleSide, shading: THREE.SmoothShading } );    
    this.green = new THREE.Mesh( geometry2, material2 );  
    this.green.shading = true;  
    this.green.castShadow = true;
    this.green.receiveShadow = true;
    this.logoGroup.add(this.green);

    //ORANGE BODY - RIGHT    
    var pts = [];
    pts.push( new THREE.Vector3( 6.65, -1.5,0 ));
    pts.push( new THREE.Vector3( 10.1, 0, 0 ));    
    pts.push( new THREE.Vector3( 10.8, 7.0,0 ));
    pts.push( new THREE.Vector3( 1.7,3.1,0 ));
    var shape2 = new THREE.Shape( pts );
    var geometry3 = new THREE.ShapeGeometry( shape2 );
    var material3 = new THREE.MeshPhongMaterial( { color: 0xFF7F00, side: THREE.DoubleSide, shading: THREE.SmoothShading } );    
    this.orangeLeft = new THREE.Mesh( geometry3, material3 );  
    this.orangeLeft.shading = true;  
    this.orangeLeft.rotation.x = deg(-20);
    this.orangeLeft.rotation.y = deg(25);
    this.orangeLeft.translateZ(2.0);
    this.orangeLeft.castShadow = true;
    this.orangeLeft.receiveShadow = true;
    this.logoGroup.add(this.orangeLeft);

    //ORANGE BODY - LEFT 
    var pts = [];
    pts.push( new THREE.Vector3( 6.65, -1.5,0 ));
    pts.push( new THREE.Vector3( 10.1, 0,0 ));    
    pts.push( new THREE.Vector3( 10.8, 7.0,0 ));
    pts.push( new THREE.Vector3( 1.7,3.1,0 ));
    var shape3 = new THREE.Shape( pts );
    var geometry4 = new THREE.ShapeGeometry( shape3 );
    var material4 = new THREE.MeshPhongMaterial( { color: 0xFF7F00, side: THREE.DoubleSide, shading: THREE.SmoothShading } );    
    this.orangeRight = new THREE.Mesh( geometry4, material4 );  
    this.orangeRight.shading = true;  
    this.orangeRight.rotation.x = deg(20);
    this.orangeRight.rotation.y = deg(-25);
    this.orangeRight.translateZ(-2.0);
    this.orangeRight.castShadow = true;
    this.orangeRight.receiveShadow = true;
    this.logoGroup.add(this.orangeRight);

    this.logoGroup.translateX(-4.4);
    this.logoGroup.translateY(23.9);
    this.logoGroup.translateZ(40.6);
  
    //NAME
    /*var loader = new THREE.FontLoader();
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
                
        this.groupName = new THREE.Group();
        var mesh = new THREE.Mesh( geometryC, material );
        mesh.position.x = 0;
        mesh.position.y = 18;
        mesh.position.z = 0;
        //mesh.rotation.y = Math.PI * 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;        
        this.groupName.add( mesh );        
 
        var mesh = new THREE.Mesh( geometryA, material );
        mesh.position.x = 15;
        mesh.position.y = 18;
        mesh.position.z = 0;
        //mesh.rotation.y = Math.PI * 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.groupName.add( mesh );        
       
        var mesh = new THREE.Mesh( geometryP, material );
        mesh.position.x = 31;
        mesh.position.y = 18;
        mesh.position.z = 0;
        //mesh.rotation.y = Math.PI * 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.groupName.add( mesh );        
       
        var mesh = new THREE.Mesh( geometryS, material );
        mesh.position.x = 46;
        mesh.position.y = 18;
        mesh.position.z = 0;
        //mesh.rotation.y = Math.PI * 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.groupName.add( mesh );        
       
        var mesh = new THREE.Mesh( geometryP, material );
        mesh.position.x = 63;
        mesh.position.y = 18;
        mesh.position.z = 0;
        //mesh.rotation.y = Math.PI * 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.groupName.add( mesh ); */       
        
        /*var mesh = new THREE.Mesh( geometryI, material );
        mesh.position.x = 78;
        mesh.position.y = 18;
        mesh.position.z = 0;
        mesh.rotation.y = Math.PI * 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.groupName.add( mesh );        
        App.tojo.scene.add( this.groupName );*/
        /*var i = new THREE.BoxGeometry(2.2, 14.9, 2);
        var material2 = new THREE.MeshBasicMaterial( { color: 0x8B9B93 } );
        var mesh2 = new THREE.Mesh(i, material2);
        mesh2.position.x = 79.5;
        mesh2.position.y = 25.4;
        mesh2.position.z = 1;
        //mesh2.rotation.y = Math.PI * 2;
        mesh2.castShadow = true;
        mesh2.receiveShadow = true;
        this.groupName.add(mesh2);
        

        var mesh = new THREE.Mesh( geometryR, material );
        mesh.position.x = 83;
        mesh.position.y = 18;
        mesh.position.z = 0;
        //mesh.rotation.y = Math.PI * 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.groupName.add( mesh );        
        
        var mesh = new THREE.Mesh( geometryE, material );
        mesh.position.x = 90;
        mesh.position.y = 18;
        mesh.position.z = 0;
        //mesh.rotation.y = Math.PI * 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.groupName.add( mesh );        

        this.groupName.translateX(-45);      
        //this.groupName.rotateY(.09461);*/
        
        App.tojo.all.add( App.tojo.logoGroup );
        //App.tojo.all.add( this.groupName );
        
        //App.tojo.all.translateY(16);
        //App.tojo.sightLine.y += 65; 
        //App.tojo.all.lookAt(App.tojo.sightLine);
        //App.tojo.sightLine.y -= 65;
        //App.tojo.all.rotateY(-.110);     
               
        App.tojo.scene.add(App.tojo.all);

        //App.mouse.target = new THREE.Vector3(App.tojo.sightLine.x, App.tojo.sightLine.y, App.tojo.sightLine.z);

	    //App.renderer.render( App.tojo.scene, App.camera );
   // });       
}

tojo11.prototype.RedrawScene = function() {
	this.RedrawSceneFrame();
	this.UpdateSceneCamera();
	this.UpdateSceneLighting();
	this.UpdateUserInput();

    App.renderer.render( this.scene, App.camera );
    //App.effect.render( this.scene, App.camera )
}

var degree = 0;
tojo11.prototype.RedrawSceneFrame = function() {
    //this.yellow.rotation.z = degree;
    //this.green.rotation.x = degree;
    //this.green.rotation.z = -degree;
    degree+=.01;
}
  
var skip = 1;
var counter = 0;
tojo11.prototype.UpdateSceneCamera = function() {
    counter++;
    if(counter % skip != 0) return;    
    App.tojo.logoGroup.position.y += (Math.random() < .5 ? .1 : -.1) / 5;
    //rotateCameraY(rotSpeed);
    //App.camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
    //App.camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
    //App.camera.lookAt(this.scene.position);
    //App.camera.rotation += 1.9;

    //App.camera2.position.x = x * Math.cos(-rotSpeed) + z * Math.sin(-rotSpeed);
    //App.camera2.position.z = z * Math.cos(-rotSpeed) - x * Math.sin(-rotSpeed);
    //App.camera2.lookAt(this.scene.position);


    
    /*var delta = this.clock.getDelta();
	var rotateAngle = Math.PI / 2 * 20; 
	var relativeCameraOffset = new THREE.Vector3(0,0,0);
	var cameraOffset = relativeCameraOffset.applyMatrix4( this.cylinder.matrixWorld );
	App.camera.position.x = cameraOffset.x;
	App.camera.position.y = cameraOffset.y;
	App.camera.position.z = cameraOffset.z;
	App.camera.lookAt( this.cylinder.position );*/

    /*var newX = App.camera.position.x;
    var newY = App.camera.position.y;
    var newZ = App.camera.position.z;

    App.camera.up = new THREE.Vector3(0,0,1);
	App.camera.position.set(newX, newY, newZ);
    App.camera.lookAt(this.cylinder.position);	*/	
    //App.camera.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);
}

tojo11.prototype.UpdateSceneLighting = function() {
	
}

//USER EVENTS
tojo11.prototype.UpdateUserInput = function() {
	this.UpdateUserKeyboard();
	this.UpdateUserMouse();
}

tojo11.prototype.UpdateUserKeyboard = function() {
	//this.keyboard.update();	
}

tojo11.prototype.UpdateUserMouse = function() {
    App.mouse.update();
	//App.controls.update();
}

//ANIMATION
var stopScene = false;
tojo11.prototype.AnimateScene = function(fps) {
    if(stopScene) {
        startScene = false;
        return;
    }
    App.tojo.RedrawScene();

    if(App.vrDisplay === undefined) {
        requestAnimationFrame(App.tojo.AnimateScene);
    }
    else {    
	    App.vrDisplay.requestAnimationFrame(App.tojo.AnimateScene);
    }
}

tojo11.prototype.StopAnimation = function() {
	stopScene = true;
}


tojo11.prototype.CalculateFPS = function() {
	if(this.previousRenderStamp == null) {
		this.previousRenderStamp = Date.now();
		return;
	}
	var time = Date.now() - this.previousRenderStamp;
	this.previousRenderStamp = Date.now();
	if(this.renderLengthQueue.length > 0) {
		this.renderLengthQueue.shift();
	}
	this.renderLengthQueue.push(time);
	var length = 0;
	this.renderLengthQueue.forEach(function(a) {
		length += a;
	});
	this.fps = (1000/(length / this.renderLengthQueue.length)) * this.renderLengthQueue.length;
    //for(var a = 1; a < 100000000; a++){}
}

function deg(degree)   { return degree*(Math.PI/180); }