import type Tracklist from "./Tracklist";

export interface TracklistParser {
    parse(input: string): Tracklist;
}
