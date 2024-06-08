import { TriviaQuestion } from "../generatedApi";

export interface TriviaGameModel{

    triviaQuestions: TriviaQuestionModel[];
    isTransition: boolean;
}

export interface TriviaQuestionModel extends TriviaQuestion {
    showOptions: boolean;
    isCurrent:boolean;
}
