import './App.css'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Feed from './component/Feed'
import Neo from './component/Neo'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact path="/" element={<Feed />} />
            <Route exact path="/neo/:id" element={<Neo />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
