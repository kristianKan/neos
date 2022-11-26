import React from 'react'
import { useSelector } from 'react-redux'
import { useGetNeosByDateQuery } from '../services/neoFeed'

const DATE = {
  start: '2015-09-07',
  end: '2015-09-08',
}

const List = () => {
  const { data, error, isLoading, isSuccess, isError } = useGetNeosByDateQuery(DATE)
  const date = useSelector((state) => state.list.neosCount)

  let content

  if (isLoading) {
    content = <div text="Loading..." />
  } else if (isSuccess) {
    content = data.element_count
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <div>
      <h2>Number of Neos: {content}</h2>
    </div>
  )
}

export default List
