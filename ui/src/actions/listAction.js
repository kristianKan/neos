import { SET_DATE, SET_SELECTED_NEO } from '../actionTypes/actionTypes'

const setDate = (date) => {
  return {
    type: SET_DATE,
    date,
  }
}

const setSelectedNeo = (id) => {
  return {
    type: SET_SELECTED_NEO,
    id,
  }
}

export { setDate, setSelectedNeo }
