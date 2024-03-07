import { expect, test } from "vitest";
import TraktorHtmlParser from "../../src/parser/TraktorHtmlParser";
import path from "node:path";
import { readFileSync } from "node:fs";

test("parses valid traktor HTML", () => {
    const html = readFileSync(
        path.resolve(__dirname + "/../mocks/traktor.html"),
    );
    const tracklist = new TraktorHtmlParser().parse(html.toString("utf-8"));

    expect(tracklist.title).toBe("HISTORY222");
    expect(tracklist.performer).toBe("");
    expect(tracklist.tracks.length).toBe(34);
    expect(tracklist.tracks[0].title).toBe("The Road I'm On (nxu edit)");
    expect(tracklist.tracks[0].performer).toBe("Ranji & Bingo Bango");
    expect(tracklist.tracks[0].file).toBe("Ranji - Road Im On - nxu edit.mp3");
    expect(tracklist.tracks[0].start).toBe("00:00:00");
    expect(tracklist.tracks[0].length).toBe("03:21");

    expect(tracklist.tracks[33].title).toBe("Pa Moru");
    expect(tracklist.tracks[33].start).toBe("01:48:21");
});
