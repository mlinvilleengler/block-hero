const gdax = require('../gdax')
const log = require('../firebase')
const { delay, round, SELL } = require('../lib/util')

const checkToSell = async (ogPrice, oldPrice, config) => {
  const currentPrice = await gdax.getPrice(config.id),
    sellPrice = round(oldPrice - oldPrice * config.secondTierPercent),
    shouldSell = currentPrice <= sellPrice,
    shouldExit = currentPrice < ogPrice

  if (shouldExit) {
    log.marketLog(
      config.id,
      `should exit, price was ${oldPrice}, and is ${currentPrice}`
    )
    log.setTarget(config.id, {
      price: ogPrice,
      operator: SELL,
      actionPrice: null
    })
    return false
  }

  if (shouldSell) {
    log.marketLog(
      config.id,
      `should sell, price was ${oldPrice}, and is ${currentPrice}`
    )
    log.setTarget(config.id, {
      price: ogPrice,
      operator: SELL,
      actionPrice: null
    })
    return true
  }

  log.setTarget(config.id, {
    price: ogPrice,
    operator: SELL,
    actionPrice: sellPrice
  })

  await delay(2000)
  return await checkToSell(ogPrice, currentPrice, config)
}

const sell = async ({ price, cashAmount, coinAmount, config }) => {
  let currentPrice = await gdax.getPrice(config.id),
    sellPrice = round(price + price * config.firstTierPercent)

  log.setTarget(config.id, { price: sellPrice, operator: SELL })

  if (currentPrice >= sellPrice) {
    log.marketLog(config.id, 'MAYBE SELLING')

    const shouldSell = config.secondTierPercent
      ? await checkToSell(currentPrice, currentPrice, config)
      : true

    if (shouldSell && (await gdax.getPrice(config.id)) >= sellPrice) {
      log.marketLog(config.id, 'SOLD @ ' + (await gdax.getPrice(config.id)))

      const transaction = await gdax.sell(coinAmount, config)

      return {
        price: transaction.price
      }
    } else {
      log.marketLog(config.id, 'NOT GOING TO SELL')
    }
  }

  await delay(10000)

  return await sell({
    config,
    price,
    cashAmount,
    coinAmount
  })
}

module.exports = {
  sell
}
