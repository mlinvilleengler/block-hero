const gdax = require('../gdax')
const log = require('../firebase')
const { delay, round, BUY } = require('../lib/util')

const checkToBuy = async (ogPrice, oldPrice, config) => {
  const currentPrice = await gdax.getPrice(config.id),
    buyPrice = round(oldPrice + oldPrice * config.secondTierPercent),
    shouldBuy = currentPrice >= buyPrice,
    shouldExit = currentPrice > ogPrice

  if (shouldExit) {
    log.marketLog(
      config.id,
      `should exit, price was ${oldPrice}, and is ${currentPrice}`
    )
    log.setTarget(config.id, {
      price: ogPrice,
      operator: BUY,
      actionPrice: null
    })
    return false
  }

  if (shouldBuy) {
    log.marketLog(
      config.id,
      `should buy, price was ${oldPrice}, and is ${currentPrice}`
    )
    log.setTarget(config.id, {
      price: ogPrice,
      operator: BUY,
      actionPrice: null
    })
    return true
  }

  log.setTarget(config.id, {
    price: ogPrice,
    operator: BUY,
    actionPrice: buyPrice
  })

  await delay(2000)
  return await checkToBuy(ogPrice, currentPrice, config)
}

const buy = async ({ price, cashAmount, coinAmount, config }) => {
  let currentPrice = await gdax.getPrice(config.id),
    buyPrice = round(price - price * config.firstTierPercent)

  log.setTarget(config.id, { price: buyPrice, operator: BUY })

  if (currentPrice <= buyPrice) {
    log.marketLog(config.id, 'MAYBE BUYING')

    let shouldBuy = config.secondTierPercent
      ? await checkToBuy(currentPrice, currentPrice, config)
      : true

    if (shouldBuy && (await gdax.getPrice(config.id)) <= buyPrice) {
      log.marketLog(config.id, 'BOUGHT @ ' + (await gdax.getPrice(config.id)))

      const transaction = await gdax.buy(cashAmount, config)

      return {
        price: transaction.price
      }
    } else {
      log.marketLog(config.id, 'NOT GOING TO BUY')
    }
  }

  await delay(10000)

  return await buy({
    config,
    price,
    cashAmount,
    coinAmount
  })
}

module.exports = {
  buy
}
