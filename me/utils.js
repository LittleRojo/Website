function Pixel(){
    this.position = new THREE.Vector2();
    this.color = [],
    this.size = 1;
}

function Note(note, octave, duration, rest) {
    if(note == "REST"){
        this.note = "XX";
        this.duration = 1;
        this.rest = 1;
        return;
    }
    else {
        this.note = note + octave;
    }
    this.duration = duration;
    this.rest = (typeof rest === 'undefined') ? 0 : rest;
}