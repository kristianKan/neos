import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedNeo: null,
}

const neosFeedSlice = createSlice({
  name: 'neosFeed',
  initialState,
  reducers: {
    neoSet: (state, action) => {
      state.neoSet = action.id
    },
  },
})

export const { neoSet } = neosFeedSlice.actions

export default neosFeedSlice.reducer