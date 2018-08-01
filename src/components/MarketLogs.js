import React, { Component } from 'react'

export class MarketLogs extends Component {
  render () {
    return (
      <div style={{ width: '80%', minWidth: '350px', margin: '50px 0 0 0' }}>
        <div
          style={{
            color: '#0000FF',
            opacity: 0.4,
            fontSize: '35px',
            fontWeight: '900',
            marginLeft: '15px'
          }}
        >
          ACTION
        </div>
        <div
          style={{
            overflow: 'hidden',
            border: '1px solid #00007F',
            borderRadius: '5px',
            padding: '20px 20px 20px 20px',
            width: '100%',
            marginTop: '-18px',
            backgroundColor: 'rgba(243, 243, 243, .6)',
            zIndex: '500',
            position: 'relative'
          }}
        >
          <div
            onClick={() => {
              document.getElementById('marketLogs').scrollTop = 9999999
            }}
            style={{
              position: 'absolute',
              top: '25px',
              right: '25px',
              color: '#26267F'
            }}
          >
            <i className='material-icons fly'>arrow_downward</i>
          </div>
          <div id='marketLogs' style={{ height: '400px', overflow: 'scroll' }}>
            {this.props.marketLogs.map((log, index) => {
              return <h5 key={index} style={{ textAlign: 'left' }}>{log}</h5>
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default MarketLogs
