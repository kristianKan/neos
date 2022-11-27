import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { neoFeedApi } from './services/neoFeed'
import { listReducer } from './reducers/listReducer'

const reducer = combineReducers({
  [neoFeedApi.reducerPath]: neoFeedApi.reducer,
  list: listReducer,
})

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(neoFeedApi.middleware),
})

setupListeners(store.dispatch)
