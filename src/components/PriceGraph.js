import React, { Component } from 'react'
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area
} from 'recharts'
import { Loader } from './Loader'

export class PriceGraph extends Component {
  render () {
    return (
      <div style={{ width: '80%', minWidth: '350px', margin: '50px 0 0 0' }}>
        <div
          style={{
            color: '#0000fF',
            opacity: 0.4,
            fontSize: '35px',
            fontWeight: '900',
            marginLeft: '15px'
          }}
        >
          MOVEMENT
        </div>
        <div
          style={{
            overflow: 'hidden',
            border: '1px solid #00007F',
            borderRadius: '5px',
            width: '100%',
            marginTop: '-18px',
            backgroundColor: 'rgba(243, 243, 243, .6)',
            zIndex: '500',
            position: 'relative'
          }}
        >

          <Loader showLoader={!this.props.showPriceGraph} />
          <div style={{ padding: '20px 20px 20px 0' }}>
            <ResponsiveContainer width='100%' height={500}>
              <ComposedChart
                margin={{ top: 10, right: 10, left: 15, bottom: 10 }}
                data={this.props.priceList}
              >
                <defs>
                  <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#000040' stopOpacity={0.55} />
                    <stop offset='100%' stopColor='#00007F' stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey='time'
                  axisLine
                  tickLine
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis
                  axisLine
                  tickLine
                  padding={{ top: 10, bottom: 10 }}
                  domain={['dataMin - 500', 'auto']}
                />
                <Tooltip />
                <Line
                  type='monotone'
                  dataKey='targetPrice'
                  dot={false}
                  stroke='cyan'
                  connectNulls
                />
                <Line
                  type='monotone'
                  dataKey='actionPrice'
                  dot={false}
                  stroke='#CC1063'
                  connectNulls
                />
                <Line
                  type='monotone'
                  dataKey='buyPrice'
                  dot={{ fill: 'black', r: 2 }}
                  stroke='none'
                />
                <Line
                  type='monotone'
                  dataKey='sellPrice'
                  dot={{ fill: 'grey', r: 2 }}
                  stroke='none'
                />
                <Area
                  type='monotone'
                  dataKey='price'
                  stroke='none'
                  dot={false}
                  fillOpacity={1}
                  fill='url(#colorPv)'
                  connectNulls
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    )
  }
}

export default PriceGraph
