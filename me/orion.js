function Sound(bpm) {
    this.conductor = new BandJS();
    this.conductor.setTickerCallback(function(seconds) {
        
    });
        this.conductor.setOnFinishedCallback(function() {
    
    });

    this.conductor.setOnDurationChangeCallback(function() {
        var totalSeconds = this.conductor.getTotalSeconds();
    });
    this.rightHand = this.conductor.createInstrument('sine', 'oscillators');
    this.leftHand = this.conductor.createInstrument('sine', 'oscillators');       
}

Sound.prototype.Load = function() {
    this.conductor.setMasterVolume(50);
    this.conductor.setTimeSignature(4, 4);
    this.conductor.setTempo(90);  

    var octave = 4;
    this.rightHand.setVolume(25);
    this.rightHand.note('half', 'C' + octave)
        .note('half', 'C' + octave)
        .note('half', 'G' + octave)
        .note('half', 'G' + octave)
        .note('half', 'A' + octave)
        .note('half', 'A' + octave)
        .note('whole', 'G' + octave)
        
        .rest('eighth')
        .note('half', 'F' + octave)
        .note('half', 'F' + octave)
        .note('half', 'E' + octave)
        .note('half', 'E' + octave)
        .note('half', 'D' + octave)
        .note('half', 'D' + octave)
        .note('whole', 'C' + octave)
        
        .rest('eighth')
        .note('half', 'G' + octave)
        .note('half', 'G' + octave)
        .note('half', 'F' + octave)
        .note('half', 'F' + octave)
        .note('half', 'E' + octave)
        .note('half', 'E' + octave)
        .note('whole', 'D' + octave)
        
        .rest('eighth')
        .note('half', 'G' + octave)
        .note('half', 'G' + octave)
        .note('half', 'F' + octave)
        .note('half', 'F' + octave)
        .note('half', 'E' + octave)
        .note('half', 'E' + octave)
        .note('whole', 'D' + octave)
        
        .rest('eighth')
        .note('half', 'C' + octave)
        .note('half', 'C' + octave)
        .note('half', 'G' + octave)
        .note('half', 'G' + octave)
        .note('half', 'A' + octave)
        .note('half', 'A' + octave)
        .note('whole', 'G' + octave)
        
        .rest('eighth')
        .note('half', 'F' + octave)
        .note('half', 'F' + octave)
        .note('half', 'E' + octave)
        .note('half', 'E' + octave)
        .note('half', 'D' + octave)
        .note('half', 'D' + octave)
        .note('whole', 'C' + octave)
        .rest('whole');

    this.rightHand.repeatFromBeginning(1000);

    /*octave = 4;
    this.leftHand.setVolume(50);
    this.leftHand.note('eighth', 'C' + octave)
        .note('eighth', 'C' + octave)
        .note('eighth', 'C' + octave)
        .note('eighth', 'C' + octave)
        .note('eighth', 'C' + octave)
        .note('eighth', 'C' + octave)
        .note('eighth', 'C' + octave)
        .note('eighth', 'C' + octave);*/

     

    this.player = this.conductor.finish();  
}

Sound.prototype.Play = function() {     
    this.player.play();
}