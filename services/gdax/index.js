const { getGdaxPrice, getPrice } = require('./get-price.js')
const { getAccountStatus } = require('./get-account-status.js')
const { buy } = require('./buy.js')
const { sell } = require('./sell.js')

module.exports = {
  start: async () => setInterval(getGdaxPrice, 2000),
  getPrice,
  getAccountStatus,
  buy,
  sell
}
