import React, { Component } from 'react'
import { App } from './App'

export class AppContainer extends Component {
  db = window.firebase.database()

  state = {
    transactionLogs: [],

    marketLogs: [],

    price: '',

    target: {},

    priceList: [],

    transactionList: [],

    showPriceGraph: false
  }

  componentDidMount () {
    this.setState({ showPriceGraph: false })

    this.getTarget()

    this.getMarketLogs()

    this.getTransactions()

    this.getPrice()

    this.getHistoricalPrice()
  }

  componentWillUnmount () {
    this.db.ref(`${this.props.id}/target`).off()
    this.db.ref(`${this.props.id}/transaction_logs`).off()
    this.db.ref(`${this.props.id}/market_logs`).off()
    this.db.ref(`price_logs`).off()
  }

  updateAndSortPriceList (priceList) {
    priceList = priceList.sort((a, b) => a.time - b.time)
    this.setState({ priceList })
  }

  getTarget () {
    let firstTarget

    this.db.ref(`${this.props.id}/target`).on('value', snapshot => {
      this.setState({ target: snapshot.val() })

      if (
        (!firstTarget || snapshot.val().actionPrice) &&
        snapshot.val().price
      ) {
        this.updatePriceList(snapshot.val().price, snapshot.val().actionPrice)
        firstTarget = true
      }
    })
  }

  getTransactions () {
    this.db.ref(`${this.props.id}/transaction_logs`).on('child_added', data => {
      this.setState({
        transactionLogs: [...this.state.transactionLogs, data.val()]
      })

      if (data.val().time) {
        const priceObj = data.val().type === 'BUY'
          ? {
            buyPrice: data.val().price,

            time: data.val().time
          }
          : {
            sellPrice: data.val().price,

            time: data.val().time
          }

        this.setState({
          priceList: [...this.state.priceList, priceObj]
        })
      }
    })
  }

  getMarketLogs () {
    this.db
      .ref(`${this.props.id}/market_logs`)
      .limitToLast(50)
      .on('child_added', data =>
        this.setState({ marketLogs: [...this.state.marketLogs, data.val()] })
      )
  }

  updatePriceList (targetPrice, actionPrice) {
    if (targetPrice || this.state.target.price) {
      const priceList = this.state.priceList.map(p => ({
        ...p,
        targetPrice: targetPrice || this.state.target.price,
        actionPrice: actionPrice
      }))

      this.setState({ priceList })
    }
  }

  getPrice () {
    this.db.ref('price_logs').limitToLast(1).on('child_added', data => {
      const { price, time } = data.val()
      const priceObj = {
        time,
        price,
        targetPrice: this.state.target.price,
        actionPrice: this.state.target.actionPrice
      }

      this.setState({
        price,

        priceList: [...this.state.priceList, priceObj]
      })
    })
  }

  getHistoricalPrice () {
    this.db.ref('price_logs').once('value', data => {
      const priceList = [...this.state.priceList]
      let count = 0

      data.forEach(d => {
        if (count === 100) {
          priceList.push({
            ...d.val(),
            targetPrice: this.state.target.price,
            actionPrice: this.state.target.actionPrice
          })

          count = 0
        }

        count++
      })

      this.updateAndSortPriceList(priceList)
      setTimeout(() => this.setState({ showPriceGraph: true }), 2000)
    })
  }

  render () {
    return (
      <App
        {...this.state}
        id={this.props.id}
        botIndex={this.props.botIndex}
        increaseBot={this.props.increaseBot}
        decreaseBot={this.props.decreaseBot}
      />
    )
  }
}

export default AppContainer
