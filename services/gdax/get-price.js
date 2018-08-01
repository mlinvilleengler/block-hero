const log = require('../firebase')
const { delay, round } = require('../lib/util')
const fetch = require('node-fetch')
let price = null

const getGdaxPrice = () =>
  fetch('https://api.coinbase.com/v2/prices/spot?currency=USD')
    .then(res => res.json())
    .then(({ data }) => {
      log.priceLog(+data.amount)
      price = +data.amount
    })
    .catch(err => console.log(err))

const getPrice = async id => {
  if (price) {
    return price
  }

  await delay(2000)
  return await getPrice()
}

module.exports = {
  getGdaxPrice,
  getPrice
}
