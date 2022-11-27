import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useGetNeosByDateQuery } from '../services/neoApi'
import { setDate } from '../actions/listAction'
import DatePicker from 'react-datepicker'
import Neos from './Neos'

import 'react-datepicker/dist/react-datepicker.css'

const List = () => {
  const date = useSelector((state) => state.list.date)
  const dispatch = useDispatch()
  const { data, error, isLoading } = useGetNeosByDateQuery(date)

  const onDateChange = () => {
    return (date) => {
      const start = date.toISOString().split('T')[0]
      const end = new Date(date.setDate(date.getDate() + 6))
        .toISOString()
        .split('T')[0]
      const formattedDate = { start, end }
      dispatch(setDate(formattedDate))
    }
  }

  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) :
      isLoading ? (
        <>loading...</>
      ) : data ? (
        <>
          <div>
            <h2>Number of Neos: {data.element_count}</h2>
            <DatePicker
              selected={new Date(date.start)}
              onChange={onDateChange()}
              dateFormat="yyyy-MM-dd"
            />
            <Neos data={data.near_earth_objects}/>
          </div>
        </>
      ) : null}
    </>
  )
}

export default List
