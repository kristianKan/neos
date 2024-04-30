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
            <Route path="/" element={<NeosFeed />}>
              <Route path="neo/:id" element={<Neo />} />
            </Route>
            <Route path="/:date" element={<NeosFeed />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
