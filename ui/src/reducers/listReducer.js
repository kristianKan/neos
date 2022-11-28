import { SET_DATE, SET_SELECTED_NEO } from '../actionTypes/actionTypes'

const timeElapsed = Date.now()
const date = new Date(timeElapsed)
const start = date.toISOString().split('T')[0]

const initialState = {
  date: {
    start: start,
    end: new Date(date.setDate(date.getDate() + 6)).toISOString().split('T')[0],
  },
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

    default:
      return state
  }
}
