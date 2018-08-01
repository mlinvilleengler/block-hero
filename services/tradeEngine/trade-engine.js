const gdax = require('../gdax')
const log = require('../firebase')
const { delay, BUY, SELL } = require('../lib/util')
const { buy } = require('./buy')
const { sell } = require('./sell')

const tradeEngine = async ({
  config,
  price,
  coinAmount = 0,
  cashAmount = 0,
  operator = SELL
}) => {
  let transaction

  try {
    if (operator === SELL) {
      transaction = await sell({
        config,
        price,
        cashAmount,
        coinAmount
      })
    }

    if (operator === BUY) {
      transaction = await buy({
        config,
        price,
        cashAmount,
        coinAmount
      })
    }

    await delay(10000)

    const accountStatus = await gdax.getAccountStatus(config.id)

    return await tradeEngine({
      config,
      cashAmount: accountStatus.cashAmount,
      coinAmount: accountStatus.coinAmount,
      price: transaction.price || accountStatus.price,
      operator: accountStatus.operator
    })
  } catch (err) {
    console.log(err)

    log.errorLog(err)

    await delay(1000000)

    return await tradeEngine({
      config,
      cashAmount,
      price,
      coinAmount,
      operator
    })
  }
}

module.exports = {
  tradeEngine
}
