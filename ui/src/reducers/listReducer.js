import { SET_DATE, SET_SELECTED_NEO } from '../actionTypes/actionTypes'

const timeElapsed = Date.now()
const date = new Date(timeElapsed)
const formattedDate = date.toISOString().split('T')[0]

const initialState = {
  date: {
    start: formattedDate,
    end: formattedDate,
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
