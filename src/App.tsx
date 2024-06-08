import { AppRoutes } from './AppRoutes'
import { Provider } from 'react-redux'
import { store } from './store'
import { CountDownTime } from './Components/Layout/CountDownTime'

function App() {
  return (
    <Provider store={store}>
      <header></header>
      <AppRoutes></AppRoutes>
      <CountDownTime></CountDownTime>
    </Provider>
  )
}

export default App
