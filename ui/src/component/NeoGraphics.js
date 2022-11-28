import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: -1;
`

const NeoGraphics = (props) => {
  const ref = useRef(null)

  // an ease function to make animation more funky
  const customElastic = d3.easeElastic.period(0.6)

  const drawCircle = ({ data, height, width, r }) => {
    return (node) => {
      node
        .selectAll('circle')
        .data([data])
        .join((enter) => {
          return enter
            .append('circle')
            .attr('cx', width / 2)
            .attr('cy', height / 2)
            .style('fill', (d) =>
              d.is_potentially_hazardous_asteroid ? 'red' : '#ffe000'
            )
            .transition()
            .duration(2000)
            .ease(customElastic)
            .attr('r', (d) => r(d.absolute_magnitude_h))
        })
    }
  }

  useEffect(() => {
    // if there's no date and no ref, there's nothing to do here
    if (!props.data || !ref.current) {
      return null
    }

    const { data } = props

    let height = ref.current.parentElement.offsetHeight
    let width = ref.current.parentElement.offsetWidth

    // set r scale to map magnitude to circle radius
    const r = d3
      .scaleSqrt()
      .domain([10, 40])
      .range([10, height / 2])

    // select ref and draw all components
    d3.select(ref.current)
      .attr('height', height)
      .attr('width', width)
      .call(drawCircle({ data, height, width, r }))
  })

  return (
    <Container>
      <svg ref={ref} />
    </Container>
  )
}

export default NeoGraphics
