import React, { useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import * as d3 from 'd3'
import { setSelectedNeo } from '../actions/listAction'

const height = 500;
const width = 500;
const margin = {
  top: 20,
  right: 40,
  bottom: 30,
  left: 40
}
const customElastic = d3.easeElastic.period(0.6)

const Neos = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const d3Container = useRef(null)

  const x = d3.scaleLinear()
    .domain([0, 1])
    .range([0, 800])

  const r = d3.scaleSqrt()
    .domain([10, 300])
    .range([1, 10])

  const onClick = (d) => {
    dispatch(setSelectedNeo(d.id))
    navigate(`/neo/${d.id}`);
  }

  useEffect(
    () => {
      if (props.data && d3Container.current) {
        const data = Object.entries(props.data).reduce((acc, [ k, v ]) => {
          return [ ...acc, ...v ]
        }, [])

        const svg = d3.select(d3Container.current)

        svg.selectAll('circle')
          .data(data, d => d.id)
          .join(
            enter => {
              return enter.append('circle')
                .attr('cx', (d, i) => x(d.close_approach_data[0].miss_distance.astronomical))
                .attr('cy', height / 2)
                .style('stroke-width', 0)
                .style('fill', d => d.is_potentially_hazardous_asteroid ? 'red' : 'black')
                .transition().duration(1000).ease(customElastic)
                  .attr('r', d => r(d.absolute_magnitude_h))
            },
            update => {
              return update
                .attr('cx', (d, i) => x(d.close_approach_data[0].miss_distance.astronomical))
                .style('stroke-width', 3)
                .transition().duration(2000)
                  .style('fill', d => d.is_potentially_hazardous_asteroid ? 'red' : 'black')
                  .attr('r', d => r(d.absolute_magnitude_h))
                  .style('stroke-width', 0)
            },
            exit => {
              exit
                .transition().duration(1000)
                .attr('r', 0)
                .style('fill', 'transparent')
            }
          )
          .style('stroke', '#000')
          .on('click', (e, d) => onClick(d));
      }
    },
  )

  return (
    <svg
      ref={d3Container}
      viewBox={`0 0 ${height} ${width}`}
      style={{
        height: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    />
  )
}

export default Neos
