import React, { Component } from 'react'

export const RectangleLoader = () => (
  <div style={{ height: '15px', width: '15px', display: 'inline-block' }}>
    <svg
      version='1.1'
      id='L1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      x='0px'
      y='0px'
      viewBox='0 0 100 100'
      enableBackground='new 0 0 100 100'
      xmlSpace='preserve'
    >

      <g fill='#444'>
        <rect x='30' y='35' width='10' height='60'>
          <animateTransform
            attributeName='transform'
            dur='1s'
            type='translate'
            values='0 10 ; 0 -10; 0 10'
            repeatCount='indefinite'
            begin='0'
          />
        </rect>
        <rect x='50' y='35' width='10' height='60'>
          <animateTransform
            attributeName='transform'
            dur='1s'
            type='translate'
            values='0 10 ; 0 -10; 0 10'
            repeatCount='indefinite'
            begin='0.1'
          />
        </rect>
        <rect x='70' y='35' width='10' height='60'>
          <animateTransform
            attributeName='transform'
            dur='1s'
            type='translate'
            values='0 10 ; 0 -10; 0 10'
            repeatCount='indefinite'
            begin='0.2'
          />
        </rect>
        <rect x='90' y='35' width='10' height='60'>
          <animateTransform
            attributeName='transform'
            dur='1s'
            type='translate'
            values='0 10 ; 0 -10; 0 10'
            repeatCount='indefinite'
            begin='0.3'
          />
        </rect>
      </g>
    </svg>
  </div>
)

export default RectangleLoader
