import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useGetNeosByDateQuery } from '../services/neoApi'
import { setDate } from '../actions/listAction'
import DatePicker from 'react-datepicker'
import Neos from './Neos'
import styled, { keyframes } from 'styled-components'

import 'react-datepicker/dist/react-datepicker.css'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 40px;
  height: 100vh;
`

const Header = styled.div``

const StyledH1 = styled.h1`
  color: #ff00ff;
  font-size: 50px;
`

const StyledH2 = styled.h2`
  color: #fff;
`

const Asterisk = styled.i`
  color: #fff;
  margin-bottom: 10px;
  font-size: 10px;
  margin-top: auto;
`

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 50px;
  color: #ffe000;
`

const Spin = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`

const Spinner = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  font-size: 50px;
  color: #fff;
  animation-name: ${Spin};
  animation-duration: 2s;
  animation-iteration-count: infinite;
`

const List = () => {
  const date = useSelector((state) => state.list.date)
  const dispatch = useDispatch()
  const { data, error, isFetching } = useGetNeosByDateQuery(date)

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
    <Container>
      {isFetching ? <Spinner>🌚</Spinner> : null}
      <Header>
        <StyledH1>NEOs</StyledH1>
        <StyledH2>pick a date*</StyledH2>
        <DatePicker
          selected={new Date(date.start)}
          onChange={onDateChange()}
          dateFormat="yyyy-MM-dd"
        />
      </Header>
      {error ? (
        <Error>Oh no... {error.error}</Error>
      ) : data ? (
        <Neos data={data.near_earth_objects} />
      ) : null}
      <Asterisk>* date is a 7 day period starting on the selected day</Asterisk>
    </Container>
  )
}

export default List
