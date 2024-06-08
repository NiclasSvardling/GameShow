import { Route, Routes } from 'react-router-dom'

import { GameShowController } from './Components/GameShowController'
import { NameGameShowViewer } from './Components/Games/NameGameShowViewer'
import { GamePageNavigator } from './Components/Layout/GamePageNavigator'
import { TriviaGame } from './Components/Games/TriviaGame'
import { TranslateSongQuiz } from './Components/Games/TranslateSongQuiz'
import { SurveyGuessGame } from './Components/Games/SurveyGuessGame'
import { JeopardyGame } from './Components/Games/JeopardyGame'
import { ControllerHeader } from './Components/Layout/ControllerHeader'
import { StartPage } from './Components/StartPage/StartPage'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<GamePageNavigator />}>
        <Route path='/GameShow/' element={<StartPage />}></Route>
        <Route path='/NameGame' element={<NameGameShowViewer />}></Route>
        <Route path='/Trivia' element={<TriviaGame />}></Route>
        <Route path='/TranslateQuiz' element={<TranslateSongQuiz />}></Route>
        <Route path='/SurveyGuess' element={<SurveyGuessGame />}></Route>
        <Route path='/JeopardyGame' element={<JeopardyGame />}></Route>
      </Route>
      <Route path='/' element={<ControllerHeader />}>
        <Route path='/controller' element={<GameShowController />}></Route>
      </Route>
    </Routes>
  )
}
