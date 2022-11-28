import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { useGetNeoByIdQuery } from '../services/neoApi'
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
  padding-right: 10px;
`

const NeoDetails = (_) => {
  const params = useParams()
  let { id } = useSelector((state) => state.list)

  if (!id) {
    id = params.id
  }

  const { data, error, isFetching } = useGetNeoByIdQuery(id)

  let name
  let isHazardous
  let magnitude
  if (data) {
    name = data.name
    isHazardous = data.is_potentially_hazardous_asteroid ? 'yes' : 'no'
    magnitude = data.absolute_magnitude_h
  }

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
          <StyledH1>{name}</StyledH1>
          <Details>
            <Col style={{ fontWeight: 'bold' }}>
              <Row>Id:</Row>
              <Row>Name:</Row>
              <Row>Hazardous:</Row>
              <Row>Magnitude:</Row>
            </Col>
            <Col>
              <Row>{id}</Row>
              <Row>{name}</Row>
              <Row>{isHazardous}</Row>
              <Row>{magnitude}</Row>
            </Col>
          </Details>
        </>
      ) : null}
    </Container>
  )
}

export default NeoDetails
