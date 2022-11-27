import './App.css'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from './component/List'
import NeoDetails from "./component/NeoDetails";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Routes>
            <Route exact path="/" element={<List/>} />
            <Route
              exact
              path="/neo/:id"
              element={<NeoDetails/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
