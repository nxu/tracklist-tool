export default class Track {
    constructor(
        public index: number,
        public title: string,
        public performer: string,
        public file: string,
        public start: string,
        public length: string | null = null,
    ) {
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