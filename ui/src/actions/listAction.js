import { SET_DATE, SET_SELECTED_NEO, SET_SELECTED_INDEX } from '../actionTypes/actionTypes'

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

const setSelectedIndex = ({unit, date, isL2R}) => {
  return {
    type: SET_SELECTED_INDEX,
    [unit]: date,
    isL2R
  }
}

export { setDate, setSelectedNeo, setSelectedIndex }
