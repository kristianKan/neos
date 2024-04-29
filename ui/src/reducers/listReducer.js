import { SET_DATE, SET_SELECTED_NEO, SET_SELECTED_INDEX } from '../actionTypes/actionTypes'

const timeElapsed = Date.now()
const date = new Date(timeElapsed)
const start = date.toISOString().split('T')[0]
const [year, month, day] = start.split('-').map(Number);

const initialState = {
  date: {
    start: start,
    end: start
  },
  index: { 
    day,
    month,
    year,
    isL2R: true
  }
}

export const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE:
      return {
        ...state,
        date: action.date,
      }

    case SET_SELECTED_NEO:
      return {
        ...state,
        id: action.id,
      }

    case SET_SELECTED_INDEX:
      return {
        ...state,
        index: { 
          day: action.day ? action.day : state.index.day,
          month: action.month ? action.month : state.index.month,
          year: action.year ? action.year : state.index.year,
          isL2R: action.isL2R
        }
      }

    default:
      return state
  }
}
