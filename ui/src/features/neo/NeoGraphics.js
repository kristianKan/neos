import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'

const Container = styled.div`
  background-color: #030539;
  background-color: rgb(3 5 57 / 30%);
  backdrop-filter: blur(6px);
  position: absolute;
  height: calc(100vh - 4px);
  width: calc(100vw - 40px);
  z-index: -1;
`

const NeoGraphics = ({ data, isFetching}) => {
  const ref = useRef(null)

  // an ease function to make animation more funky
  const customElastic = d3.easeElastic.period(0.6)

  const drawCircle = ({ data, colour, height, width, r }) => {
    return (node) => {
      node
        .selectAll('circle')
        .data(data)
        .join((enter) => {
          return enter
            .append('circle')
            .attr('cx', width / 2)
            .attr('cy', height / 2)
            .style('fill', colour)
            .attr('opacity', 0.5)
            .transition()
            .duration(2000)
            .ease(customElastic)
            .attr('r', (v) => r(v))
        })
    }
  }

  useEffect(() => {
    // if there's no date and no ref, there's nothing to do here
    if (!data || !ref.current) {
      return 
    }

    const {
      estimated_diameter_min: min,
      estimated_diameter_max: max
    } = data.estimated_diameter.meters

    const colour = data.is_potentially_hazardous_asteroid ? 'red' : '#ffe000';
    const height = ref.current.parentElement.offsetHeight
    const width = ref.current.parentElement.offsetWidth

    // set r scale to map magnitude to circle radius
    const r = d3
      .scaleSqrt()
      .domain([10, 10000])
      .range([10, height / 2])

    // select ref and draw all components
    d3.select(ref.current)
      .attr('height', height)
      .attr('width', width)
      .call(drawCircle({ data: [min, max], colour, height, width, r }))
  })

  return (
    <Container>
      <svg ref={ref} />
    </Container>
  )
}

export default NeoGraphics
