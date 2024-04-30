import React from 'react'
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { useGetNeosByDateQuery } from '../../services/neoApi'
import DatePicker from '../datePicker/DatePicker'
import NeosGraphics from './NeosFeedGraphics'
import Spinner from '../spinner/Spinner'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 40px;
  height: 100vh;
  
`

const DatePickerContainer = styled.div`
  margin-bottom: 10px;
`

const Header = styled.div``

const StyledH1 = styled.h1`
  color: #ff00ff;
  font-size: 50px;
`

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 50px;
  color: #ffe000;
`

const NeosFeed = () => {
  const { day, month, year } = useSelector((state) => state.datePicker.date)
  const dateFormatted = `${year}-${month}-${day}`
  const date = { start: dateFormatted, end: dateFormatted }
  const { data, error, isFetching } = useGetNeosByDateQuery(date)

  return (
    <>
      {isFetching ? <Spinner /> : null}
      <Container>
        <Header>
          <StyledH1>NEOs</StyledH1>
        </Header>
        {error ? (
          <Error>Oh no... {error.error}</Error>
        ) : data ? (
          <NeosGraphics data={data.near_earth_objects} />
        ) : null}
        <DatePickerContainer>
          <DatePicker unit="year"/>
          <DatePicker unit="month"/>
          <DatePicker unit="day"/>
        </DatePickerContainer>
        <Outlet />
      </Container>
    </>
  )
}

export default NeosFeed
