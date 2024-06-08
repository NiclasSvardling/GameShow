import { TranslateSongQuizModel } from "../generatedApi";

export class TranslateSongModel {
    id?: number;
    revealTitle: boolean;
    lyrics?: { lyric: string, play: boolean, id:number }[] | null;
    songTitle?: string | null;
    youTubeLink?: string | null;
    isCurrent:boolean;

    constructor(m: TranslateSongQuizModel) {
        this.id = m.id;
        this.revealTitle = false;
        this.songTitle = m.songTitle;
        this.youTubeLink = m.youTubeLink;
        this.lyrics = m.lyrics?.map((l, i) => { return { lyric: l, play: false, id: i } })
        this.isCurrent = m.id == 0
    }
}