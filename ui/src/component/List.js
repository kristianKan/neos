import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useGetNeosByDateQuery } from '../services/neoFeed'
import { setDate } from '../actions/listAction'
import DatePicker from 'react-datepicker'
import Neos from './Neos'

import 'react-datepicker/dist/react-datepicker.css'

const List = () => {
  const date = useSelector((state) => state.list.date)
  const dispatch = useDispatch()
  const { data, error, isLoading, isSuccess, isError } =
    useGetNeosByDateQuery(date)

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

  let content
  let neos

  if (isLoading) {
    content = <div>Loading...</div>
  } else if (isSuccess) {
    content = data.element_count
    neos = data.near_earth_objects
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <div>
      <h2>Number of Neos: {content}</h2>
      <DatePicker
        selected={new Date(date.start)}
        onChange={onDateChange()}
        dateFormat="yyyy-MM-dd"
      />
      <Neos data={neos}/>
    </div>
  )
}

export default List
