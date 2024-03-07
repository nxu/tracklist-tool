import { expect, test } from "vitest";
import TraktorHtmlParser from '../../src/parser/TraktorHtmlParser';
import path from 'node:path';
import {readFileSync} from 'node:fs'

test('parses valid traktor HTML', () => {
    const html = readFileSync(path.resolve(__dirname + '/../mocks/traktor.html'));
    const tracklist = (new TraktorHtmlParser).parse(html.toString("utf-8"));

    expect(tracklist.title).toBe('HISTORY222');
    expect(tracklist.performer).toBe('');
    expect(tracklist.tracks.length).toBe(34);
});