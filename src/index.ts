import * as Tone from 'tone';
import { Midi } from '@tonejs/midi';

const synth = new Tone.PolySynth(Tone.Synth).toDestination();

async function loadAndPlayMidi(url: string) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const midi = new Midi(arrayBuffer);

    midi.tracks.forEach(track => {
        track.notes.forEach(note => {
            synth.triggerAttackRelease(note.name, note.duration, note.time);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.createElement('button');
    startButton.innerText = 'Start Audio';
    document.body.appendChild(startButton);

    startButton.addEventListener('click', async () => {
        await Tone.start();
        console.log('Audio Context started');

        // Example MIDI file URL, replace with your own file URL
        const midiUrl = './assets/comfortably_numb.mid';
        loadAndPlayMidi(midiUrl).then(() => {
            console.log('MIDI file loaded and playing');
        }).catch(error => {
            console.error('Error loading MIDI file', error);
        });
    });
});

console.log('Tone.js is ready!');
