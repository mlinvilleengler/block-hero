import React, { Component } from 'react'

export class Header extends Component {
  getTotalValue () {
    const { transactionLogs } = this.props
    const transactionsLength = transactionLogs.length
    if (transactionsLength > 0) {
      return this.round(transactionLogs[transactionsLength - 1].totalValue)
    }
  }

  getTotalPercantage () {
    const { transactionLogs } = this.props
    const transactionsLength = transactionLogs.length
    if (transactionsLength > 1) {
      const start = transactionLogs[0].amount
      const end = transactionLogs[transactionsLength - 1].amount
      const percentageChange = (end - start) / start * 100
      return this.round(percentageChange)
    }
  }

  getChangePerDay () {
    const { transactionLogs } = this.props
    const transactionsLength = transactionLogs.length
    if (transactionsLength > 1) {
      const days = this.getTotalDaysTrading()
      const value = this.getTotalPercantage()
      return this.round(value / days)
    }
  }

  getTotalDaysTrading () {
    const { transactionLogs } = this.props
    const transactionsLength = transactionLogs.length
    if (transactionsLength > 1) {
      const start = transactionLogs[0].time
      const end = transactionLogs[transactionsLength - 1].time
      const total = end - start
      const days = total / 86400000
      return this.round(days, 10)
    }
  }

  round (num, op = 100) {
    num = num * op
    num = Math.round(num)
    return num / op
  }

  render () {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '80%',
          minWidth: '350px'
        }}
      >
        <div
          style={{
            color: '#00007F',
            opacity: 0.78,
            fontSize: '45px',
            fontWeight: '900',
            marginLeft: '15px',
            margin: '10px 0',
            textAlign: 'center'
          }}
        >
          BLOCK HERO<span className='astro' />
        </div>
        <div
          style={{
            margin: '5px 0',
            color: 'grey',
            border: '1px solid grey',
            borderRadius: '5px',
            padding: '10px 20px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <i
            onClick={this.props.decreaseBot}
            className='material-icons'
            style={{
              color: '#4C4CFF',
              margin: '0',
              cursor: 'pointer',
              visibility: this.props.botIndex === 0 ? 'hidden' : ''
            }}
          >
            arrow_back
          </i>
          BOT: {this.props.id.toUpperCase()}
          <i
            onClick={this.props.increaseBot}
            className='material-icons'
            style={{
              color: '#4C4CFF',
              margin: '0',
              cursor: 'pointer',
              visibility: this.props.botIndex === 0 ? 'hidden' : ''
            }}
          >
            arrow_forward
          </i>
        </div>
        <div
          style={{
            margin: '5px 0',
            color: 'grey',
            border: '1px solid grey',
            borderRadius: '5px',
            padding: '10px 20px',
            textAlign: 'center'
          }}
        >
          PRICE: ${this.props.price}
        </div>
        <div
          style={{
            margin: '5px 0',
            color: 'grey',
            border: '1px solid grey',
            borderRadius: '5px',
            padding: '10px 20px',
            textAlign: 'center'
          }}
        >
          {this.props.target.operator} PRICE: ${this.props.target.price}{' '}
        </div>
        {this.props.target.actionPrice &&
          <div
            style={{
              margin: '5px 0',
              color: 'grey',
              border: '1px solid grey',
              borderRadius: '5px',
              padding: '10px 20px',
              textAlign: 'center'
            }}
          >
            ACTION PRICE: ${this.props.target.actionPrice}{' '}
          </div>}
        <div
          style={{
            margin: '5px 0',
            color: 'grey',
            border: '1px solid grey',
            borderRadius: '5px',
            padding: '10px 20px',
            textAlign: 'center'
          }}
        >
          TOTAL VALUE: ${this.getTotalValue()}
        </div>
        <div
          style={{
            margin: '5px 0',
            color: 'grey',
            border: '1px solid grey',
            borderRadius: '5px',
            padding: '10px 20px',
            textAlign: 'center'
          }}
        >
          TOTAL CHANGE: {this.getTotalPercantage()}%
        </div>
        <div
          style={{
            margin: '5px 0',
            color: 'grey',
            border: '1px solid grey',
            borderRadius: '5px',
            padding: '10px 20px',
            textAlign: 'center'
          }}
        >
          DAYS TRADING: {this.getTotalDaysTrading()}
        </div>
        <div
          style={{
            margin: '5px 0',
            color: 'grey',
            border: '1px solid grey',
            borderRadius: '5px',
            padding: '10px 20px',
            textAlign: 'center'
          }}
        >
          AVG CHANGE PER DAY: {this.getChangePerDay()}%
        </div>
      </div>
    )
  }
}

export default Header
