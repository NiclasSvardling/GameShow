import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './AppRoutes'
import { Provider } from 'react-redux'
import { store } from './store'
import { CountDownTime } from './Components/Layout/CountDownTime'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <header></header>
        <AppRoutes></AppRoutes>
        <CountDownTime></CountDownTime>
      </Provider>
    </BrowserRouter>
  )
}

export default App
