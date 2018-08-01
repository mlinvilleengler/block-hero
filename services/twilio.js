const log = require('./firebase')
const config = require('../config')
const { accountSid, authToken, fromNumber, toNumber } = config.twilio
const twilio = require('twilio')
const client = new twilio(accountSid, authToken)

const sendText = text => {
  if (process.env.NODE_ENV !== 'production') return

  client.messages
    .create({
      body: text,
      to: toNumber, // Text this number
      from: fromNumber // From a valid Twilio number
    })
    .catch(err => log.errorLog(err))
}

const sendTransactionText = ({ config, transaction }) =>
  /* formated for appropriate text spacing */
  sendText(
    `
⚡⚡☠️☠️⚡⚡
New BTC Transaction
Bot: ${config.id}
Price: ${transaction.price}
Amount: ${transaction.amount}
Fee: ${transaction.fee}
Type: ${transaction.type}
TotalValue: ${transaction.totalValue}`
  )

module.exports = {
  sendText,
  sendTransactionText
}
