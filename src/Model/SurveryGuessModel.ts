import { SurveyEntry, SurveyGameModel } from "../generatedApi";

export class SurveryGuessModel {
    id?: number;
    surveyTitle?: string | null
    surveyEntries?: SurveryEntryClientModel[] | null


    constructor(m: SurveyGameModel) {
        this.id = m.id;
        this.surveyTitle = m.surveyTitle;
        this.surveyEntries = m.surveyEntries?.map(s=>{return {...s, isRevealed: false}})
 
    }
}

export interface SurveryEntryClientModel extends SurveyEntry {
    isRevealed:boolean;

}