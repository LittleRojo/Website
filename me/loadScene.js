var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
var img = new Image();
img.onload = function(){
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img,0,0);
    
    var layer = new THREE.Geometry();				
    //layer.addAttribute("color", new THREE.BufferAttribute(pixels.color, 4));
    //layer.addAttribute("position", new THREE.BufferAttribute(positions, 3));
    //layer.addAttribute("size", new THREE.BufferAttribute(pixels.size, 1));
    layer.verticesNeedUpdate = true;
    layer.normalsNeedUpdate = true;
    layer.colorsNeedUpdate = true;
    layer.uvsNeedUpdate = true;
    layer.castShadow = true;
    layer.recieveShadow = true;		
    App.tojo.layers.push(layer);

    var counter = 0;
    var pixels = new Pixel({
        position: new Float32Array( img.width * img.height * 3 ),
        color: [],
        size: new Float32Array( img.width * img.height )
    });
    for(var x = 0; x < img.width; x++){
        for(var y = 0; y < img.height; y++) {
            var pixel = ctx.getImageData(x, y, 1, 1);

            pixels.color[counter] = new THREE.Color("rgb(" + pixel.data[0] + "," + pixel.data[1] + "," + pixel.data[2] + ")");
            if(pixels.color[counter].r == 0 && pixels.color[counter].g == 0 && pixels.color[counter].b == 0){
                continue;
            }
            //pixels.color[counter].setHSL( Math.random(), 1.0, 0.5 );
    
            /*pixels.color[ 4 * counter ] = pixel.data[0];
            pixels.color[ 4 * counter + 1 ] = pixel.data[1];
            pixels.color[ 4 * counter + 2 ] = pixel.data[2];
            pixels.color[ 4 * counter + 3 ] = pixel.data[3];*/

            pixels.position[ 3 * counter ] = x - (img.width / 2);
            pixels.position[ 3 * counter + 1 ] = (img.height - y) - (img.height / 2);
            pixels.position[ 3 * counter+ 2 ] = 0;//( Math.random() * 2 - 1 ) * this.radius;

            pixels.size[counter] = 1;

            pixels.xDirection = 1;
            pixels.yDirection = 1;
            pixels.zDirection = -1;

            var spot = new THREE.Vector3(pixels.position[ 3 * counter ], pixels.position[ 3 * counter + 1 ], pixels.position[ 3 * counter + 2 ])	
            layer.vertices.push(spot)
            counter++;
        }
    }

    layer.colors = pixels.color;
    var material = new THREE.PointsMaterial( 
    {
        color: 0xffffff,
        size: 2.883397,//2.7479,
        //blending: THREE.AdditiveBlending,
        vertexColors: THREE.VertexColors,
        //map: THREE.ImageUtils.loadTexture('spark1.png'),
        opacity: 1,
        transparent: true
    });
    //material.needsUpdate = true;
    
    var particleSystem = new THREE.Points(layer, material);
    //particleSystem.castShadow = true;
    //particleSystem.recieveShadow = true;
    particleSystem.shading = THREE.FlatShading;
    //layer.attributes.color.needsUpdate = true;
    //layer.attributes.size.needsUpdate = true;
    //layer.attributes.position.needsUpdate = true;
    //material.needsUpdate = true;
    
    //var particleSystem = new THREE.Mesh(layer, material);
    //particleSystem.geometry.attributes.color.needsUpdate = true;
    App.tojo.particleSystems.push(particleSystem);
    App.tojo.scene.add(particleSystem);	
    
    App.renderer.render(App.tojo.scene, App.camera);
    App.tojo.AnimateScene();
};