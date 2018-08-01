const twilio = require('../twilio')
const log = require('../firebase')
const { round } = require('../lib/util')
const { getPrice } = require('./get-price')
const { createOrder } = require('./create-order')
const { getFulfilledOrder } = require('./get-fulfilled-order')
const { gdaxClient } = require('./client')

module.exports = {
  buy: async (cashAmount, config) => {
    const buyParams = {
      type: 'market',
      size: `${10 || round(cashAmount / (await getPrice()))}`,
      product_id: 'BTC-USD'
    }

    const orderId = await createOrder(
      gdaxClient.buy.bind(gdaxClient),
      buyParams
    )
    const order = await getFulfilledOrder(orderId)

    const transaction = {
      price: await getPrice(), // 1 / order.filled_size * order.executed_value,
      amount: order.filled_size,
      type: 'BUY',
      totalValue: order.executed_value,
      time: new Date().getTime(),
      fee: order.fill_fees
    }

    log.transactionLog(config.id, transaction)

    twilio.sendTransactionText({
      config,
      transaction
    })

    return transaction
  }
}
