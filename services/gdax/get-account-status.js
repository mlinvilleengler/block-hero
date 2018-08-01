const { gdaxClient } = require('./client')
const { getPrice } = require('./get-price')
const { getLastTransaction } = require('../firebase')

module.exports = {
  getAccountStatus: async id => {
    const lastTransaction = await getLastTransaction(id)

    const price = lastTransaction ? lastTransaction.price : await getPrice()

    const accounts = await new Promise((resolve, reject) =>
      gdaxClient.getAccounts(
        (error, response, data) => (error ? reject(error) : resolve(data))
      )
    )

    const btcAccount = accounts.find(a => a.currency === 'BTC')
    const usdAccount = accounts.find(a => a.currency === 'USD')
    const operator = btcAccount.available * (await getPrice()) >
      usdAccount.available
      ? 'SELL'
      : 'BUY'

    return {
      price,
      operator,
      cashAmount: +usdAccount.available,
      coinAmount: +btcAccount.available
    }
  }
}
