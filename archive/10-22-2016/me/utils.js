function Pixel(){
    this.position = new THREE.Vector2();
    this.color = [],
    this.size = 1;
}

function Note(note) {
    this.note = note[0];
    this.octave = note[1];
    this.frequency = 0;    
    if(this.note == "C") this.frequency = 261.6;
    if(this.note == "D") this.frequency = 293.7;
    if(this.note == "E") this.frequency = 329.6;
    if(this.note == "F") this.frequency = 349.2;
    if(this.note == "G") this.frequency = 392;
    if(this.note == "A") this.frequency = 440;
    if(this.note == "B") this.frequency = 493.9;
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