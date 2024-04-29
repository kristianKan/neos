import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { useGetNeoByIdQuery } from '../../services/neoApi'
import NeoGraphics from './NeoGraphics'
import styled, { keyframes } from 'styled-components'

const Container = styled.div`
  margin: 40px;
  color: #fff;
  height: 100vh;
  width: 100vw;
`

const Button = styled.button`
  background-color: #ffe000;
  font-size: 18px;
`

const Details = styled.section`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`

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
  top: 50%;
  left: 50%;
  font-size: 50px;
  color: #fff;
  animation-name: ${Spin};
  animation-duration: 2s;
  animation-iteration-count: infinite;
`

const Row = styled.div`
  padding: 2px;
`

const Col = styled.div`
  padding-right: 12px;
`

const Neo = (_) => {
  const params = useParams()
  let { id } = useSelector((state) => state.neosFeed)

  // if the state is empty get id from the path
  if (!id) {
    id = params.id
  }

  const { data, error, isFetching } = useGetNeoByIdQuery(id)
  const isHazardous =
    data && data.is_potentially_hazardous_asteroid ? 'yes' : 'no'

  return (
    <Container>
      {isFetching ? <Spinner>🌚</Spinner> : null}
      <Link to="/">
        <Button>←</Button>
      </Link>
      {error ? (
        <Error>Oh no... {error.error}</Error>
      ) : data ? (
        <>
          <NeoGraphics data={data} />
          <StyledH1>{data.name}</StyledH1>
          <Details>
            <Col style={{ textAlign: 'right' }}>
              <Row>id</Row>
              <Row>name</Row>
              <Row>hazardous</Row>
              <Row>magnitude</Row>
              <Row>min diameter</Row>
              <Row>max diameter</Row>
            </Col>
            <Col style={{ fontWeight: 'bold' }}>
              <Row>{id}</Row>
              <Row>{data.name}</Row>
              <Row>{isHazardous}</Row>
              <Row>{data.absolute_magnitude_h}</Row>
              <Row>{data.estimated_diameter.meters.estimated_diameter_min.toFixed()} meters</Row>
              <Row>{data.estimated_diameter.meters.estimated_diameter_max.toFixed()} meters</Row>
            </Col>
          </Details>
        </>
      ) : null}
    </Container>
  )
}

export default Neo