const twilio = require('../twilio')
const log = require('../firebase')
const { getPrice } = require('./get-price')
const { createOrder } = require('./create-order')
const { getFulfilledOrder } = require('./get-fulfilled-order')
const { gdaxClient } = require('./client')

module.exports = {
  sell: async (coinAmount, config) => {
    const sellParams = {
      type: 'market',
      size: `${coinAmount}`,
      product_id: 'BTC-USD'
    }

    const orderId = await createOrder(
      gdaxClient.sell.bind(gdaxClient),
      sellParams
    )
    const order = await getFulfilledOrder(orderId)

    const transaction = {
      price: await getPrice(), // 1 / order.filled_size * order.executed_value,
      amount: order.filled_size,
      type: 'SELL',
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
