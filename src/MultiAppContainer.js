import React, { Component } from 'react'
import { AppContainer } from './AppContainer'

/* uncomment if you want to see dev bots */

// const env = process.env.NODE_ENV !== 'production' ? 'dev' : ''

export class MultiAppContainer extends Component {
  state = {
    tradingBots: [env + 'BOY1'],
    botIndex: 0
  }

  increaseBot () {
    this.setState({ botIndex: this.state.botIndex + 1 })
  }

  decreaseBot () {
    this.setState({ botIndex: this.state.botIndex - 1 })
  }

  render () {
    return (
      <div>
        {this.state.tradingBots.map(b => (
          <div key={b}>
            {this.state.tradingBots[this.state.botIndex] === b &&
              <AppContainer
                id={b}
                botIndex={this.state.botIndex}
                increaseBot={() => this.increaseBot()}
                decreaseBot={() => this.decreaseBot()}
              />}
          </div>
        ))}

      </div>
    )
  }
}

export default MultiAppContainer
