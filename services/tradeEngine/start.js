const gdax = require('../gdax')
const log = require('../firebase')
const { bots } = require('./bot-config.js')
const { tradeEngine } = require('./trade-engine.js')

module.exports = {
  start: async () => {
    try {
      await gdax.start()

      await Promise.all(
        bots.map(async config => {
          const {
            coinAmount,
            cashAmount,
            operator,
            price
          } = await gdax.getAccountStatus(config.id)

          log.marketLog(
            config.id,
            'Entering market with ' +
              coinAmount +
              ' btc, $' +
              cashAmount +
              ', and looking to ' +
              operator
          )

          await tradeEngine({
            config,
            price,
            coinAmount,
            cashAmount,
            operator
          })
        })
      )
    } catch (err) {
      console.log(err)
      log.errorLog(err)
    }
  }
}
