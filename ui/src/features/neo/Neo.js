import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'

import { useGetNeoByIdQuery } from '../../services/neoApi'
import NeoGraphics from './NeoGraphics'

const Container = styled.div`
  color: #fff;
  display: flex;
  justify-content: space-between;
  width: calc(100vw - 40px);
  position: absolute;
  z-index: 1;
`

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Button = styled.button`
  color: #030539;
  background-color: #ffe000;
  border-top: none;
  border-left: none;
  border-right: 2px solid lawngreen; 
  border-bottom: 2px solid lawngreen;
  font-size: 24px;
  cursor: pointer;
`

const Details = styled.section`
  color: rgb(255 255 255 / 80%);
  font-size: 16px;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`

const StyledH1 = styled.h1`
  background-color: #030539;
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

const Row = styled.div`
  padding: 2px;
`

const Col = styled.div`
  padding-right: 12px;
`

const Neo = (_) => {
  const params = useParams()
  const location = useLocation()
  const id = useSelector((state) => state.neosFeed.id) || params.id
  const d = location.state.datum

  const { data, error, isFetching } = useGetNeoByIdQuery(id)
  const isHazardous = isFetching ? '' : data.is_potentially_hazardous_asteroid ? 'yes' : 'no'
  const name = isFetching ? d ? d.name : '' : data.name 
  const magnitude = isFetching ? '' : data.absolute_magnitude_h
  const minDiameter = isFetching ? '' : data.estimated_diameter.meters.estimated_diameter_min.toFixed()
  const maxDiameter = isFetching ? '' : data.estimated_diameter.meters.estimated_diameter_max.toFixed()

  return (
    <Container>
      {error && ( <Error>Oh no... {error.error}</Error> )}
      <>
        <DataContainer>
          {<NeoGraphics data={data} isFetching={isFetching} />}
          <StyledH1>{name}</StyledH1>
          <Details>
            <Col style={{ textAlign: 'right', fontWeight: 100 }}>
              <Row>id</Row>
              <Row>name</Row>
              <Row>hazardous</Row>
              <Row>magnitude</Row>
              <Row>min diameter</Row>
              <Row>max diameter</Row>
            </Col>
            <Col style={{ fontWeight: 800 }}>
              <Row>{id}</Row>
              <Row>{name}</Row>
              <Row>{isHazardous}</Row>
              <Row>{magnitude}</Row>
              <Row>{minDiameter} meters</Row>
              <Row>{maxDiameter} meters</Row>
            </Col>
          </Details>
        </DataContainer>
        <Link to="/">
          <Button>{'<'}</Button>
        </Link>
      </>
    </Container>
  )
}

export default Neo