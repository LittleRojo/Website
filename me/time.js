function Time() {
    this.startTime = 0;
    this.stopTime = 0;
}

Time.prototype = {
    constructor: Time,
    start: function() {
        this.startTime = ( performance || Date ).now();
    },
    stop: function() {
        this.stopTime = ( performance || Date ).now();
    },
    stepForward: function( milliseconds ) {
        this.stopTime = ( performance || Date ).now();
        this.stopTime += milliseconds;
    },
    rewind: function( milliseconds ) {
        this.stopTime = ( performance || Date ).now();
        this.stopTime -= milliseconds;
    },
    getTime() {
        this.currentTime = ( performance || Date ).now();
        return this.currentTime - this.startTime;
    }
}


