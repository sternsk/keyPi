import * as Tone from 'tone';

// Define a mapping from keyboard keys to musical notes
const keyNoteMap: { [key: string]: string } = {
    'a': 'C4',
    'w': 'C#4',
    's': 'D4',
    'e': 'D#4',
    'd': 'E4',
    'f': 'F4',
    't': 'F#4',
    'g': 'G4',
    'z': 'G#4',
    'h': 'A4',
    'u': 'A#4',
    'j': 'B4',
    'k': 'C5'
};

const synth = new Tone.Synth().toDestination();

document.addEventListener('keydown', (e) => {
    const note = keyNoteMap[e.key];
    synth.triggerAttack(note);
    console.log(e)
  });
  
  document.addEventListener('keyup', () => {
    synth.triggerRelease();
    console.log("1248")
  });
  
  console.log('Tone.js is ready!');