import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as d3 from 'd3'

import { neoSet } from './neosFeedSlice'

// side margin
const MARGIN = 40
// datapicker and header height
const TOP = 196

const NeosGraphics = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ref = useRef(null)

  const { isL2R } = useSelector(state => state.datePicker)

  // should be moved to utils
  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const onClick = (d) => {
    dispatch(neoSet(d.id))
    navigate(`/neo/${d.id}`)
  }

  const onMouseOver = (e, d) => {
    const circle = d3.select(e.currentTarget)
    // magnify radius by the factor of 2
    circle.attr('r', circle.attr('r') * 2)
  }

  const onMouseOut = (e, d) => {
    const circle = d3.select(e.currentTarget)
    // set radius to its original value
    circle.attr('r', circle.attr('r') / 2)
  }

  const drawAxis = ({ x, height }) => {
    // display the first and the last tick values only
    const axis = d3.axisBottom(x).tickValues(x.domain())

    // since x axis is absolute it's not updated
    return (node) => {
      node
        .selectAll('.axis')
        .data(['dummy'])
        .join((enter) => {
          return enter
            .append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0, ${height / 2})`)
            .call(axis)
            .call((g) => {
              g.select('.domain')
                .style('stroke', 'white')
                .attr('stroke-opacity', 0.5)
                .attr('stroke-dasharray', '2,2')
              g.selectAll('.tick line')
                .style('stroke', 'white')
                .attr('stroke-opacity', 0.5)
              g.selectAll('.tick text')
                .style('fill', 'white')
                .attr('opacity', 0.5)
              g.selectAll('.tick').attr(
                'transform',
                (d, i) => `translate(${x.range()[i]}, ${12})`
              )
            })
        })
    }
  }

  const drawCircles = ({ data, height, width, x, r }) => {
    return (node) => {
      node
        .selectAll('circle')
        .data(data, (d) => d.id)
        .join(
          (enter) => {
            return enter
              .append('circle')
              .attr('cx', () => isL2R ? randomInt(-width * 2, -width) : randomInt(width + 100, width * 2))
              .attr('cy', height / 2)
              .style('fill', (d) =>
                d.is_potentially_hazardous_asteroid ? 'red' : '#ffe000'
              )
              .attr('opacity', 0.8)
              .transition()
              .duration(800)
              .attr('cx', (d, i) =>
                x(d.close_approach_data[0].miss_distance.astronomical)
              )
              .attr('r', (d) => r(d.absolute_magnitude_h))
          },
          (update) => {
            return update
              .transition()
              .duration(1000)
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
              .duration(1200)
              .attr('cx', () => isL2R ? randomInt(width + 100, width * 2) : randomInt(-width * 2, -width))
              .remove()
          }
        )
        .attr('cursor', 'pointer')
        .on('click', (e, d) => onClick(d))
        .on('mouseover', (e, d) => onMouseOver(e, d))
        .on('mouseout', (e, d) => onMouseOut(e, d))
    }
  }

  useEffect(() => {
    // if there's no date and no ref, there's nothing to do here
    if (!props.data || !ref.current) {
      return
    }

    //TODO move this logic to backend
    const data = Object.entries(props.data)
      // move all the crazy data into a nice array
      .reduce((acc, [k, v]) => [...acc, ...v], [])
      // sort by magnitude so larger neos are drawn first
      .sort((a, b) => a.absolute_magnitude_h - b.absolute_magnitude_h)

    // some quick and dirty layout calculations
    let height = ref.current.parentElement.offsetHeight - TOP - MARGIN * 2
    let width = ref.current.parentElement.offsetWidth - MARGIN * 2

    // set x scale to map distance units to pixels
    const x = d3
      .scaleLinear()
      .domain([0, 0.5]) // astronomical units
      .range([20, width - 20]) // pixels

    // set r scale to map magnitude to circle radius
    const r = d3
      .scaleSqrt()
      .domain(d3.extent(data, (d) => d.absolute_magnitude_h))
      .range([10, 2]) // lower magnitude -> bigger circle

    // select ref and draw all components
    d3.select(ref.current)
      .attr('height', height)
      .attr('width', width)
      .call(drawAxis({ x, height }))
      .call(drawCircles({ data, height, width, x, r }))
  })

  return <svg ref={ref} />
}

export default NeosGraphics
