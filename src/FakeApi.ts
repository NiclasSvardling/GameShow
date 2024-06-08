import { GameNameModel, JeopardyModel, SurveyGameModel, TranslateSongQuizModel, TriviaQuestion } from "./generatedApi";


export const fetchNameGame = async (): Promise<GameNameModel> => {
    const response = await fetch(`${window.location.origin}/GameShow/TestData/NameGameDecerno.json`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: GameNameModel = await response.json();
    return data;
};


export const fetchJeopardy = async (): Promise<JeopardyModel[]> => {
    const response = await fetch(`${window.location.origin}/GameShow/TestData/JeopardyData.json`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: JeopardyModel[] = await response.json();
    return data;
};

export const fetchTranslateGame= async (): Promise<TranslateSongQuizModel[]> => {
    const response = await fetch(`${window.location.origin}/GameShow/TestData/EurovisionTranslate.json`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: TranslateSongQuizModel[] = await response.json();
    return data;
};


export const fetchSurveyGame = async (): Promise<SurveyGameModel> => {
    const response = await fetch(`${window.location.origin}/GameShow/TestData/SurveyData.json`);
    console.log(response)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: SurveyGameModel = await response.json();
    return data;
};


export const fetchTriviaGame = async (): Promise<TriviaQuestion[]> => {
    const response = await fetch(`${window.location.origin}/GameShow/TestData/TriviaData.json`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: TriviaQuestion[] = await response.json();
    return data;
};