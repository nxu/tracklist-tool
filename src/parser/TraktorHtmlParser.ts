import * as cheerio from "cheerio";
import Track from "./Track";
import Tracklist from "./Tracklist";
import { DateTime } from "luxon";
import type { TracklistParser } from "./TracklistParser";

type ColumnDefinition = {
    title: number | null;
    performer: number | null;
    file: number | null;
    start: number | null;
    length: number | null;
};

export default class TraktorHtmlParser implements TracklistParser {
    parse(input: string): Tracklist {
        const $ = cheerio.load(input);

        const title = this.getTitle($);
        const performer = ""; // Traktor HTML does not include performer name
        const columns = this.getColumns($);
        const tracks = this.getTracks($, columns);

        return new Tracklist(title, performer, tracks);
    }

    private getTitle($: cheerio.CheerioAPI): string {
        const title = $("h1").prop("innerText");

        if (title === null || title.length < 1) {
            throw "Tracklist title not found";
        }

        return title.replace("Track List: ", "");
    }

    private getColumns($: cheerio.CheerioAPI): ColumnDefinition {
        const headers = $("th").toArray();

        if (headers == null || headers.length < 1) {
            throw "Tracklist table headers could not be parsed";
        }

        const title = headers.findIndex(
            (el) => $(el).prop("innerText") === "Title",
        );
        const performer = headers.findIndex(
            (el) => $(el).prop("innerText") === "Artist",
        );
        const file = headers.findIndex(
            (el) => $(el).prop("innerText") === "File Name",
        );
        const start = headers.findIndex(
            (el) => $(el).prop("innerText") === "Start Time",
        );
        const length = headers.findIndex(
            (el) => $(el).prop("innerText") === "Duration",
        );

        return { title, performer, file, start, length };
    }

    private getTracks(
        $: cheerio.CheerioAPI,
        columns: ColumnDefinition,
    ): Track[] {
        const rows = $("tr:has(td)").toArray();

        if (rows === null || rows.length < 1) {
            throw "No tracks found";
        }

        const tracks = rows.map((element, idx) => {
            const cells = $(element).children("td").toArray();

            return new Track(
                idx,
                $(cells[columns.title]).prop("innerText"),
                $(cells[columns.performer]).prop("innerText"),
                $(cells[columns.file]).prop("innerText"),
                $(cells[columns.start]).prop("innerText"),
                $(cells[columns.length]).prop("innerText"),
            );
        });

        return this.timeToRelative(tracks);
    }

    private timeToRelative(tracks: Track[]): Track[] {
        const initialTime = DateTime.fromFormat(
            tracks[0].start,
            "yyyy/M/d HH:mm:ss",
        );

        return tracks.map((track) => {
            const secondsSinceStart = DateTime.fromFormat(
                track.start,
                "yyyy/M/d HH:mm:ss",
            ).diff(initialTime, "seconds").seconds;

            const start = DateTime.fromISO("2000-01-01T00:00:00.000").plus({
                seconds: secondsSinceStart,
            });

            return new Track(
                track.index,
                track.title,
                track.performer,
                track.file,
                start.toFormat("HH:mm:ss"),
                track.length,
            );
        });
    }
}
