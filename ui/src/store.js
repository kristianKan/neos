import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { neoApi } from './services/neoApi'
import { listReducer } from './reducers/listReducer'

const reducer = combineReducers({
  [neoApi.reducerPath]: neoApi.reducer,
  list: listReducer,
})

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(neoApi.middleware),
})

setupListeners(store.dispatch)
