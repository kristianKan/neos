import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import NeosFeed from './features/neosFeed/NeosFeed'
import Neo from './features/neo/Neo'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact path="/" element={<NeosFeed />} />
            <Route exact path="/:date" element={<NeosFeed />} />
            <Route exact path="/neo/:id" element={<Neo />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
