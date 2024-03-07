import Track from "../parser/Track";

export default class CueSheet {
    file: string;
    tracks: Track[];

    constructor(file: string, tracks: Track[]) {
        this.file = file;
        this.tracks = tracks;
    }

    toString() {
        const tracks = this.tracks.reduce((tracklist: string, track: Track) => tracklist + track.toString(), "");

        return `FILE "${this.file.replaceAll('"', '')}" WAVE\n${tracks}`;
    };
}