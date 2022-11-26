import { SET_DATE } from '../actionTypes/actionTypes'

const setDate = (date) => {
  return {
    type: SET_DATE,
    date
  }
}

export { setDate }
