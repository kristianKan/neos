import React, { useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as d3 from 'd3'
import { setSelectedNeo } from '../actions/listAction'

const customElastic = d3.easeElastic.period(0.6)

const Neos = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ref = useRef(null)

  const onClick = (d) => {
    dispatch(setSelectedNeo(d.id))
    navigate(`/neo/${d.id}`)
  }

  const onMouseOver = (e, d) => {
    const circle = d3.select(e.currentTarget)

    circle.attr('r', circle.attr('r') * 2)
  }

  const onMouseOut = (e, d) => {
    const circle = d3.select(e.currentTarget)

    circle.attr('r', circle.attr('r') / 2)
  }

  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  useEffect(() => {
    if (!props.data || !ref.current) {
      return null
    }

    const data = Object.entries(props.data).reduce((acc, [k, v]) => {
      return [...acc, ...v]
    }, [])

    let height = ref.current.parentElement.offsetHeight - 196 - 80
    let width = ref.current.parentElement.offsetWidth - 80

    const x = d3
      .scaleLinear()
      .domain(
        d3.extent(
          data,
          (d) => d.close_approach_data[0].miss_distance.astronomical
        )
      )
      .range([20, width - 20])

    const r = d3
      .scaleSqrt()
      .domain(d3.extent(data, (d) => d.absolute_magnitude_h))
      .range([2, 10])

    const svg = d3
      .select(ref.current)
      .attr('height', height)
      .attr('width', width)

    svg
      .selectAll('circle')
      .data(data, (d) => d.id)
      .join(
        (enter) => {
          return enter
            .append('circle')
            .attr('cx', () => randomInt(-100, width + 100))
            .attr('cy', height / 2)
            .style('fill', (d) =>
              d.is_potentially_hazardous_asteroid ? 'red' : '#ffe000'
            )
            .transition()
            .duration(1000)
            .ease(customElastic)
            .attr('cx', (d, i) =>
              x(d.close_approach_data[0].miss_distance.astronomical)
            )
            .attr('r', (d) => r(d.absolute_magnitude_h))
        },
        (update) => {
          return update
            .transition()
            .duration(2000)
            .style('fill', (d) =>
              d.is_potentially_hazardous_asteroid ? 'red' : '#ffe000'
            )
            .attr('r', (d) => r(d.absolute_magnitude_h))
            .attr('cx', (d, i) =>
              x(d.close_approach_data[0].miss_distance.astronomical)
            )
        },
        (exit) => {
          exit
            .transition()
            .duration(1000)
            .attr('cx', () => randomInt(-100, width + 100))
            .attr('r', 0)
            .style('fill', 'transparent')
        }
      )
      .attr('cursor', 'pointer')
      .on('click', (e, d) => onClick(d))
      .on('mouseover', (e, d) => onMouseOver(e, d))
      .on('mouseout', (e, d) => onMouseOut(e, d))
  })

  return <svg ref={ref} />
}

export default Neos
