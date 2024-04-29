import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { neoApi } from './services/neoApi'
import datePickerReducer from './features/datePicker/datePickerSlice'
import neosFeedReducer from './features/neosFeed/neosFeedSlice'

const reducer = combineReducers({
  [neoApi.reducerPath]: neoApi.reducer,
  datePicker: datePickerReducer,
  neosFeed: neosFeedReducer
})

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(neoApi.middleware),
})

setupListeners(store.dispatch)
