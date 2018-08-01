import React, { Component } from 'react'
import { PriceGraph } from './components/PriceGraph'
import { MarketLogs } from './components/MarketLogs'
import { Header } from './components/Header'
import { TransactionLogs } from './components/TransactionLogs'

export class App extends Component {
  render () {
    return (
      <div
        className='App'
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '5% 12% 10% 12%'
        }}
      >
        <Header
          target={this.props.target}
          price={this.props.price}
          id={this.props.id}
          botIndex={this.props.botIndex}
          increaseBot={this.props.increaseBot}
          decreaseBot={this.props.decreaseBot}
          transactionLogs={this.props.transactionLogs}
        />
        <PriceGraph
          priceList={this.props.priceList}
          showPriceGraph={this.props.showPriceGraph}
        />
        <MarketLogs marketLogs={this.props.marketLogs} />
        {this.props.transactionLogs.length > 0 &&
          <TransactionLogs transactionLogs={this.props.transactionLogs} />}
      </div>
    )
  }
}

export default App
