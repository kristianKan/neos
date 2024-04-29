import { createSlice } from '@reduxjs/toolkit'

const timeElapsed = Date.now()
const date = new Date(timeElapsed)
const [year, month, day] = date.toISOString().split('T')[0].split('-').map(Number)

const initialState = {
  date: { 
    day,
    month,
    year,
  },
  isL2R: true
}

const datePickerSlice = createSlice({
  name: 'datePicker',
  initialState,
  reducers: {
    dateSet: (state, action) => {
      const { unit, value } = action.payload
      state.date = { 
        ...state.date,
        [unit]: value 
      }
    },
    isL2RSet: (state, action) => {
      state.isL2R = action.payload
    }
  }
})  

export const { isL2RSet, dateSet } = datePickerSlice.actions

export default datePickerSlice.reducer