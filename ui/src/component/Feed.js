import React from 'react'
import { useSelector } from 'react-redux'
import { useGetNeosByDateQuery } from '../services/neoApi'

import DatePicker from './DatePicker'
import NeosGraphics from './NeosGraphics'
import styled, { keyframes } from 'styled-components'

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

const Feed = () => {
  const { date } = useSelector((state) => state.list)
  const { data, error, isFetching } = useGetNeosByDateQuery(date)

  return (
    <Container>
      {isFetching ? <Spinner>🌚</Spinner> : null}
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
    </Container>
  )
}

export default Feed
