import { expect, test } from "vitest";
import CueSheet from "../../src/formatter/CueSheet";
import Track from "../../src/parser/Track";

test("formats cue sheet", () => {
    const sheet = new CueSheet("/home/nxu/Music/recording.mp3", [
        new Track(
            1,
            "Come Closer",
            "Max Tase",
            "/home/nxu/Music/Max Tase - Come Closer.mp3",
            "00:00:00",
        ),
        new Track(
            2,
            "Heart Beat",
            "Gaudium & Animato",
            "/home/nxu/Music/Gaudium & Animato - Heart Beat.mp3",
            "00:03:11",
        ),
    ]);

    expect(sheet.toString()).toBe(`FILE "/home/nxu/Music/recording.mp3" WAVE
\tTRACK 01 AUDIO
\t\tTITLE "Come Closer"
\t\tPERFORMER "Max Tase"
\t\tFILE "/home/nxu/Music/Max Tase - Come Closer.mp3" WAVE
\t\tINDEX 01 00:00:00
\tTRACK 02 AUDIO
\t\tTITLE "Heart Beat"
\t\tPERFORMER "Gaudium & Animato"
\t\tFILE "/home/nxu/Music/Gaudium & Animato - Heart Beat.mp3" WAVE
\t\tINDEX 01 00:03:11\n`);
});