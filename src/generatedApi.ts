import { baseApi as api } from './BaseApi'
const injectedRtkApi = api.injectEndpoints({
  endpoints: build => ({
    getGetNameGame: build.query<GetGetNameGameApiResponse, GetGetNameGameApiArg>({
      query: () => ({ url: `/GetNameGame` }),
    }),
    getGetTrivia: build.query<GetGetTriviaApiResponse, GetGetTriviaApiArg>({
      query: () => ({ url: `/GetTrivia` }),
    }),
    getTranslateQuiz: build.query<GetTranslateQuizApiResponse, GetTranslateQuizApiArg>({
      query: () => ({ url: `/TranslateQuiz` }),
    }),
    getSurveyGuess: build.query<GetSurveyGuessApiResponse, GetSurveyGuessApiArg>({
      query: () => ({ url: `/SurveyGuess` }),
    }),
    getJeopardyGame: build.query<GetJeopardyGameApiResponse, GetJeopardyGameApiArg>({
      query: () => ({ url: `/JeopardyGame` }),
    }),
    getPing: build.query<GetPingApiResponse, GetPingApiArg>({
      query: () => ({ url: `/Ping` }),
    }),
    getWeatherForecast: build.query<GetWeatherForecastApiResponse, GetWeatherForecastApiArg>({
      query: () => ({ url: `/WeatherForecast` }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as generatedApi }
export type GetGetNameGameApiResponse = /** status 200 Success */ GameNameModel[]
export type GetGetNameGameApiArg = void
export type GetGetTriviaApiResponse = /** status 200 Success */ TriviaQuestion[]
export type GetGetTriviaApiArg = void
export type GetTranslateQuizApiResponse = /** status 200 Success */ TranslateSongQuizModel[]
export type GetTranslateQuizApiArg = void
export type GetSurveyGuessApiResponse = /** status 200 Success */ SurveyGameModel
export type GetSurveyGuessApiArg = void
export type GetJeopardyGameApiResponse = /** status 200 Success */ JeopardyModel[]
export type GetJeopardyGameApiArg = void
export type GetPingApiResponse = /** status 200 Success */ string
export type GetPingApiArg = void
export type GetWeatherForecastApiResponse = /** status 200 Success */ WeatherForecast[]
export type GetWeatherForecastApiArg = void
export type GameNameItem = {
  id?: number
  title?: string | null
}
export type GameNameModel = {
  name?: string | null
  nameGame?: GameNameItem[] | null
}
export type Option = {
  id?: number
  optionText?: string | null
  isCorrect?: boolean
}
export type TriviaQuestion = {
  id?: number
  question?: string | null
  options?: Option[] | null
}
export type TranslateSongQuizModel = {
  id?: number
  lyrics?: string[] | null
  songTitle?: string | null
  youTubeLink?: string | null
}
export type SurveyEntry = {
  id?: number
  entry?: string | null
}
export type SurveyGameModel = {
  id?: number
  surveyTitle?: string | null
  surveyEntries?: SurveyEntry[] | null
}
export type JeopardyQuestion = {
  id?: number
  question?: string | null
  answer?: string | null
  isDailyDouble?: boolean
}
export type JeopardyModel = {
  id?: number
  theme?: string | null
  questions?: JeopardyQuestion[] | null
}
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6
export type DateOnly = {
  year?: number
  month?: number
  day?: number
  dayOfWeek?: DayOfWeek
  dayOfYear?: number
  dayNumber?: number
}
export type WeatherForecast = {
  date?: DateOnly
  temperatureC?: number
  temperatureF?: number
  summary?: string | null
}
export const {
  useGetGetNameGameQuery,
  useLazyGetGetNameGameQuery,
  useGetGetTriviaQuery,
  useLazyGetGetTriviaQuery,
  useGetTranslateQuizQuery,
  useLazyGetTranslateQuizQuery,
  useGetSurveyGuessQuery,
  useLazyGetSurveyGuessQuery,
  useGetJeopardyGameQuery,
  useLazyGetJeopardyGameQuery,
  useGetPingQuery,
  useLazyGetPingQuery,
  useGetWeatherForecastQuery,
  useLazyGetWeatherForecastQuery,
} = injectedRtkApi
