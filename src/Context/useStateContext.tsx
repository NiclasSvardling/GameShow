import { useContext } from 'react'
import { StateContext } from './GlobalContext'

export const useStateContext = () => {
  const context = useContext(StateContext)
  if (context === null) {
    throw new Error('No context')
  }
  return context
}
