import { writeMidi, MidiData } from 'midi-file';

// Define the MIDI data
const midiData: MidiData = {
  header: {
    format: 1 as 1,  // Explicitly type the format as 1
    numTracks: 1,
    ticksPerBeat: 480
  },
  tracks: [
    [
      { deltaTime: 0, meta: true, type: 'trackName', text: 'Lighthearted Jingle' },
      { deltaTime: 0, meta: true, type: 'setTempo', microsecondsPerBeat: 500000 },
      { deltaTime: 0, channel: 0, type: 'programChange', programNumber: 0 },
      
      { deltaTime: 0, channel: 0, type: 'noteOn', noteNumber: 72, velocity: 64 },
      { deltaTime: 480, channel: 0, type: 'noteOff', noteNumber: 72, velocity: 64 },

      { deltaTime: 0, channel: 0, type: 'noteOn', noteNumber: 76, velocity: 64 },
      { deltaTime: 480, channel: 0, type: 'noteOff', noteNumber: 76, velocity: 64 },

      { deltaTime: 0, channel: 0, type: 'noteOn', noteNumber: 79, velocity: 64 },
      { deltaTime: 480, channel: 0, type: 'noteOff', noteNumber: 79, velocity: 64 },

      { deltaTime: 0, channel: 0, type: 'noteOn', noteNumber: 76, velocity: 64 },
      { deltaTime: 480, channel: 0, type: 'noteOff', noteNumber: 76, velocity: 64 },

      { deltaTime: 0, channel: 0, type: 'noteOn', noteNumber: 72, velocity: 64 },
      { deltaTime: 480, channel: 0, type: 'noteOff', noteNumber: 72, velocity: 64 },

      { deltaTime: 0, channel: 0, type: 'noteOn', noteNumber: 67, velocity: 64 },
      { deltaTime: 480, channel: 0, type: 'noteOff', noteNumber: 67, velocity: 64 },

      { deltaTime: 0, channel: 0, type: 'noteOn', noteNumber: 64, velocity: 64 },
      { deltaTime: 480, channel: 0, type: 'noteOff', noteNumber: 64, velocity: 64 },

      { deltaTime: 0, channel: 0, type: 'noteOn', noteNumber: 60, velocity: 64 },
      { deltaTime: 960, channel: 0, type: 'noteOff', noteNumber: 60, velocity: 64 },

      { deltaTime: 0, meta: true, type: 'endOfTrack' }
    ]
  ]
};

// export the MIDI file
export const output = writeMidi(midiData);
console.log('MIDI file has been created.');
