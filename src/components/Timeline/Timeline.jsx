import React from 'react'
import * as d3 from 'd3'
import './Timeline.less'
import { insertColon } from './../../lib/tools'

const TimelineDot = ({position, txt}) =>
    <g transform={`translate(${position},0)`}>
       <circle cy={160}
               r={5}
               style={{fill: 'blue'}} />
       <text y={115}
             x={-95}
             transform="rotate(-45)"
             style={{fontSize: '12px'}}>{txt}</text>
    </g>

const Canvas = ({children}) =>
      <svg height="200" width="800" className="canvas">
        {children}
      </svg>

const Timeline = ({data = [], name}) => {
  const times = d3.extent(data.map(d => d.start) )
  const range = [10, 700]      
  const scale = d3.scaleLinear().domain(times).range(range)
      return (
          <div className="timeline">
              <h1>{name}</h1>
              <Canvas>
                  {data.map((d, i) =>
                      <TimelineDot position={scale(d.start) }
                      key={i}  txt={`${insertColon(d.start)} - ${d.title.toUpperCase()}`}
                      />
                  )}
              </Canvas>
          </div>
      )
  
}


export default Timeline