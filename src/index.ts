import * as Tone from 'tone';
import { Midi } from '@tonejs/midi';
import { output } from './createMidi'

const crusher = new Tone.BitCrusher(8).toDestination();
const chebyshev = new Tone.Chebyshev(13).connect(crusher)
const distortion = new Tone.Distortion(.1).connect(chebyshev)
const synth = new Tone.PolySynth(Tone.Synth).connect(distortion)

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
    const fileSelector = document.createElement("select")
    
    const pref = document.createElement("option")
    const comfortably_numb = document.createElement("option")
    const great_gig = document.createElement("option")
    
    fileSelector.appendChild(pref)
    fileSelector.appendChild(comfortably_numb)
    fileSelector.appendChild(great_gig)
    
    pref.value = './assets/GreatGigInTheSky.mid'
    pref.innerHTML = "disabled selected"
    pref.textContent = "chose a piece"

    comfortably_numb.value = './assets/ComfortablyNumb.mid'
    comfortably_numb.textContent = "comfortably numb"

    great_gig.value = "./assets/GreatGigInTheSky.mid"
    great_gig.textContent = "Great Gig in the sky"

    document.body.appendChild(fileSelector);

    const startButton = document.createElement('button');
    startButton.innerText = 'Play selected Audio';
    document.body.appendChild(startButton);

    startButton.addEventListener('click', async () => {
        await Tone.start();
        console.log('Audio Context started');

        // Example MIDI file URL, replace with your own file URL
        const midiUrl = fileSelector.value;
        loadAndPlayMidi(midiUrl).then(() => {
            console.log('MIDI file loaded and playing');
        }).catch(error => {
            console.error('Error loading MIDI file', error);
        });
    });

    const createButton = document.createElement("button")
    createButton.innerText = "play random Audio"
    document.body.appendChild(createButton)

    createButton.addEventListener(`click`, async() =>{
        await Tone.start();
        console.log(`getting midi file created by chatGPT by the prompt "lighthearted jingle in the style of bobby mcferrin"`)
        const midi = new Midi(output)

        midi.tracks.forEach(track => {
            track.notes.forEach(note => {
                synth.triggerAttackRelease(note.name, note.duration, note.time);
            });
        });
    })

    const distortionLabel = document.createElement("label")
    distortionLabel.textContent = "distortion:"
    document.body.appendChild(distortionLabel)

    const distortionSlider = document.createElement("input") as HTMLInputElement
    distortionSlider.type = "range"
    distortionSlider.min = "0"
    distortionSlider.max = "1"
    distortionSlider.step = ".05"
    document.body.appendChild(distortionSlider)
    distortionSlider.addEventListener("change", ()=>{
        distortion.distortion = parseInt(distortionSlider.value, 10)
    })

    const chebyshevLabel = document.createElement("label")
    chebyshevLabel.textContent = "chebyshev: "
    document.body.appendChild(chebyshevLabel)

    const chebyshevSlider = document.createElement("input") as HTMLInputElement
    chebyshevSlider.type = "range"
    chebyshevSlider.min = "0"
    chebyshevSlider.max = "100"
    chebyshevSlider.step = "1"
    document.body.appendChild(chebyshevSlider)
    chebyshevSlider.addEventListener("change", ()=>{
        chebyshev.order = parseInt(chebyshevSlider.value, 10)
    })

    const bitDepthLabel = document.createElement("label");
    bitDepthLabel.textContent = "Bit Depth:";
    document.body.appendChild(bitDepthLabel);

    const bitDepthSlider = document.createElement("input") as HTMLInputElement
    bitDepthSlider.type = "range"
    bitDepthSlider.min = "1"
    bitDepthSlider.max = "16"
    bitDepthSlider.value = "8"
    bitDepthSlider.step = "1"
    document.body.appendChild(bitDepthSlider)
    bitDepthSlider.addEventListener("change", () => {
        crusher.set({
            bits: parseInt(bitDepthSlider.value,10)
        });
    });

});

console.log('Tone.js is ready!');
