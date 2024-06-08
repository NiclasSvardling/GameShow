import { createContext } from 'react'
import { JeopardyGameModel } from '../Model/JeopardyGameModel'

type StateContextProps = {
  jeopardyGame: JeopardyGameModel[] | undefined
  setJeopardyGame: React.Dispatch<React.SetStateAction<JeopardyGameModel[] | undefined>>
}

export const StateContext = createContext<StateContextProps | null>(null)
