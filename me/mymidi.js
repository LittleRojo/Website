var context=null;   // the Web Audio "context" object
var midiAccess=null;  // the MIDIAccess object.
var attack=0.05;      // attack speed
var release=0.05;   // release speed
var portamento=0.05;  // portamento/glide speed
var activeNotes = []; // the stack of actively-pressed keys

var oscillator=null;  // the single oscillator
var envelope=null;    // the envelope for the single oscillator

window.AudioContext=window.AudioContext||window.webkitAudioContext;
context = new AudioContext();
if (navigator.requestMIDIAccess)
    navigator.requestMIDIAccess().then( onMIDIInit, onMIDIReject );
else
    alert("No MIDI support present in your browser.  You're gonna have a bad time.")

var synth = new Tone.Synth().toMaster();

// set up the basic oscillator chain, muted to begin with.
oscillator = context.createOscillator();
oscillator.frequency.setValueAtTime(110, 0);
envelope = context.createGain();
oscillator.connect(envelope);
envelope.connect(context.destination);
envelope.gain.value = 0.0;  // Mute the sound
//oscillator.start(0);  // Go ahead and start up the oscillator


function onMIDIInit(midi) {
  midiAccess = midi;

  var haveAtLeastOneDevice=false;
  var inputs=midiAccess.inputs.values();
  for ( var input = inputs.next(); input && !input.done; input = inputs.next()) {
    input.value.onmidimessage = MIDIMessageEventHandler;
    haveAtLeastOneDevice = true;
  }
  if (!haveAtLeastOneDevice)
    alert("No MIDI input devices present.  You're gonna have a bad time.");
}

function onMIDIReject(err) {
  alert("The MIDI system failed to start.  You're gonna have a bad time.");
}

function MIDIMessageEventHandler(event) {
  // Mask off the lower nibble (MIDI channel, which we don't care about)
  switch (event.data[0] & 0xf0) {
    case 0x90:
      if (event.data[2]!=0) {  // if velocity != 0, this is a note-on message
        //noteOn(event.data[1]);
        
        var note = noteFromNoteNumber( event.data[1] );
        synth.triggerAttackRelease( note, "n" );
        return;
      }
      // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.
    case 0x80:
      noteOff(event.data[1]);
      return;
  }
}

function frequencyFromNoteNumber( note ) {
  return 440 * Math.pow(2,(note-69)/12);
}

function noteFromNoteNumber( note ) {
    var octave = octaveFromNoteNumber( note );
    var note = noteFromNoteNumber( note );
    return note + octave;
}

function octaveFromNoteNumber( note ) {
    return note % 12;
}

function noteFromNoteNumber( note ) {
    switch( note % 8)
    {
        case 0:
            return 'A';
        case 1:
            return 'A#';
        case 2:
            return 'B';
        case 3:
            return 'C';
        case 4:
            return 'C#';
        case 5:
            return 'D';
        case 6:
            return 'D#';
        case 7:
            return 'E';
        case 8:
            return 'F';
        case 9:
            return 'F#';
        case 10:
            return 'G';
        case 11:
            return 'G#';       
        default:
            return 'A';
    }
}

function noteOn(noteNumber) {
  activeNotes.push( noteNumber );
  oscillator.frequency.cancelScheduledValues(0);
  oscillator.frequency.setTargetAtTime( frequencyFromNoteNumber(noteNumber), 0, portamento );
  envelope.gain.cancelScheduledValues(0);
  envelope.gain.setTargetAtTime(1.0, 0, attack);
}

function noteOff(noteNumber) {
  var position = activeNotes.indexOf(noteNumber);
  if (position!=-1) {
    activeNotes.splice(position,1);
  }
  if (activeNotes.length==0) {  // shut off the envelope
    envelope.gain.cancelScheduledValues(0);
    envelope.gain.setTargetAtTime(0.0, 0, release );
  } else {
    oscillator.frequency.cancelScheduledValues(0);
    oscillator.frequency.setTargetAtTime( frequencyFromNoteNumber(activeNotes[activeNotes.length-1]), 0, portamento );
  }
}