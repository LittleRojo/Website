function Sound() {  
    this.on = true;        
}

Sound.prototype.Load = function() {
    this.conductor = new BandJS();
    this.conductor.setMasterVolume(50);
    this.conductor.setTimeSignature(4, 4);
    this.conductor.setTempo(90);  

    this.conductor.setTickerCallback(function(seconds) {
        
    });
    
    this.conductor.setOnFinishedCallback(function() {
        App.Sound.on = false;
    });

    this.conductor.setOnDurationChangeCallback(function() {
        var totalSeconds = App.Sound.conductor.getTotalSeconds();
    });

    this.rightHand = this.conductor.createInstrument('sine', 'oscillators');
    this.leftHand = this.conductor.createInstrument('sine', 'oscillators');

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
    this.on = true;
}