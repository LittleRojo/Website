function Pixel(){
    this.position = new THREE.Vector2();
    this.color = [],
    this.size = 1;
}

function deg(degree) { 
    return degree*(Math.PI/180); 
}

function rand(min, max) {
    return Math.random() * max + min;
}

function apply(object) {
    object.updateMatrix();
    object.geometry.applyMatrix( object.matrix );
    object.position.set( 0, 0, 0 );
    object.rotation.set( 0, 0, 0 );
    object.scale.set( 1, 1, 1 );
    object.updateMatrix();
}