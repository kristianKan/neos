import './App.css'
import { Provider } from 'react-redux'
import { store } from './store'
import List from './component/List'

function App() {
  return (
    <Provider store={store}>
      <List />
    </Provider>
  )
}

export default App
