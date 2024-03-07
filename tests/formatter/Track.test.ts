import { expect, test } from "vitest";
import Track from "../../src/parser/Track";

test("formats basic valid track info", () => {
    const track = new Track(
        1,
        "Come Closer",
        "Max Tase",
        "/home/nxu/Music/Max Tase - Come Closer.mp3",
        "00:00:00",
    );

    expect(track.toString()).toBe(`\tTRACK 01 AUDIO
\t\tTITLE "Come Closer"
\t\tPERFORMER "Max Tase"
\t\tFILE "/home/nxu/Music/Max Tase - Come Closer.mp3" WAVE
\t\tINDEX 01 00:00:00\n`);
});

test("trims values to 80 characters", () => {
    const track = new Track(
        1,
        "This is an extremely long test, that's definitely longer than the 80 character limit specified by the .cue file specification",
        "This is an extremely long test, that's definitely longer than the 80 character limit specified by the .cue file specification",
        "/home/nxu/Music/Max Tase - Come Closer.mp3",
        "00:00:00",
    );

    expect(track.toString()).toBe(`\tTRACK 01 AUDIO
\t\tTITLE "This is an extremely long test, that's definitely longer than the 80 character l"
\t\tPERFORMER "This is an extremely long test, that's definitely longer than the 80 character l"
\t\tFILE "/home/nxu/Music/Max Tase - Come Closer.mp3" WAVE
\t\tINDEX 01 00:00:00\n`);
});

test("removes quotation marks from strings", () => {
    const track = new Track(
        1,
        'Come "Closer"',
        'Max "Tase"',
        '/home/nxu/Music/Max Tase - "Come Closer".mp3',
        "00:00:00",
    );

    expect(track.toString()).toBe(`\tTRACK 01 AUDIO
\t\tTITLE "Come Closer"
\t\tPERFORMER "Max Tase"
\t\tFILE "/home/nxu/Music/Max Tase - Come Closer.mp3" WAVE
\t\tINDEX 01 00:00:00\n`);
});
