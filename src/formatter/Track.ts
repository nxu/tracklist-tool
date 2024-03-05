class Track {
    index: number;
    title: string;
    performer: string;
    file: string;
    start: string;

    constructor(
        index: number,
        title: string,
        performer: string,
        file: string,
        start: string,
    ) {
        this.index = index;
        this.title = title;
        this.performer = performer;
        this.file = file;
        this.start = start;
    }

    toString(): string {
        const index: string = this.index.toString().padStart(2, "0");
        let sheet: string = `\tTRACK ${index} AUDIO\n`;
        sheet += `\t\tTITLE "${this.formatString(this.title)}"\n`;
        sheet += `\t\tPERFORMER "${this.formatString(this.performer)}"\n`;
        sheet += `\t\tFILE "${this.filterString(this.file)}" WAVE\n`;
        sheet += `\t\tINDEX 01 ${this.start}\n`;

        return sheet;
    }

    private formatString(string: string): string {
        return this.filterString(string).substring(0, 80);
    }

    private filterString(string: string): string {
        return string.replaceAll('"', "");
    }
}

export default Track;
