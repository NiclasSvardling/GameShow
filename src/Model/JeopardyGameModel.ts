import { JeopardyModel, JeopardyQuestion} from "../generatedApi";

export class JeopardyGameModel {
    id?: number;
    theme?: string | null
    questions: JeopardyQuestionModel[]


    constructor(m: JeopardyModel) {
        this.id = m.id;
        this.theme = m.theme;
        this.questions = m.questions? m.questions?.map(s=>{ return {...s, isRevealed: false, isDone: false}}) : []
 
    }
}

export interface JeopardyQuestionModel extends JeopardyQuestion {
    isRevealed:boolean;
    isDone:boolean;

}