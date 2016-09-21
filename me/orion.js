function Sound(bpm) {
    this.bpm = bpm;
    this.song = [];   
}

Sound.prototype.Load = function() {
    /*this.song.push(new Note("D3", 8));
    this.song.push(new Note("F5", 12));
    this.song.push(new Note("E5", 3));
    this.song.push(new Note("REST"));

    this.song.push(new Note("D3", 8));
    this.song.push(new Note("F5", 12));
    this.song.push(new Note("E5", 3));
    this.song.push(new Note("REST"));*/

    this.song.push(new Note("D3", 8));
    this.song.push(new Note("F5", 12));
    this.song.push(new Note("E5", 3));
    this.song.push(new Note("D5", 3));
    this.song.push(new Note("B5", 3));
    this.song.push(new Note("E5", 3));
    this.song.push(new Note("REST"));
    
}

var elapsedTime = 0;
var clock = new THREE.Clock();
Sound.prototype.Play = function() {
    var context = new (window.AudioContext || window.webkitAudioContext)();

    this.vol = context.createGain();
    this.vol.gain.value = 1; // from 0 to 1, 1 full volume, 0 is muted    
    this.vol.connect(context.destination); // connect vol to context destination

    this.osc = context.createOscillator(); // instantiate an oscillator
    this.osc.connect(this.vol); // connect osc to vol    
    this.osc.frequency.value = 7.83;    
    this.osc.start(context.currentTime); // start it three seconds from now

    /*setInterval(function() {
        App.Sound.osc.frequency.value = Math.random() * 500;
        setTimeout(function(){
            if(App.Sound.vol.gain.value == 0) {
                App.Sound.vol.gain.value = .04;
            }
            else {
                App.Sound.vol.gain.value = 0;
            }         
            App.Sound.osc.frequency.value = Math.random() * 500;          
        }, Math.random() * 1000);
    }, 1000); 	*/
}