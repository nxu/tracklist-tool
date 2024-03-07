import type Track from "./Track";

export default class Tracklist
{
    constructor(
        public title: string,
        public performer: string,
        public tracks: Track[],
    ) {}
}