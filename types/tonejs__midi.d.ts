declare module '@tonejs/midi' {
  export class Midi {
    constructor(data: ArrayBuffer);
    tracks: Array<{ notes: Array<{ name: string, duration: number, time: number }> }>;
  }
}
