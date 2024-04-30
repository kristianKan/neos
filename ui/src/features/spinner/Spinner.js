import React from 'react'
import styled, { keyframes } from 'styled-components'


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const spin = keyframes`
  0% { transform: translateX(-100%) rotate(0deg) }
  50% { transform: translateX(100%) rotate(360deg) }
  100% { transform: translateX(-100%) rotate(0deg) }
`

const Span = styled.span`
  position: absolute;
  top: 45%;
  left: 50%;
  font-size: 50px;
  color: #fff;
  animation-name: ${spin};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  transform-origin: center;
`

const Spinner = () => {
  return (
    <Container>
      <Span>🌚</Span>
    </Container>
  )
} 

export default Spinner