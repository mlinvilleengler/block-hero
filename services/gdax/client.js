const Gdax = require('gdax')
const config = require('../../config')

const { sandbox, live } = config.gdax.sandbox
const api = process.env.NODE_ENV === 'production' ? live : sandbox

module.exports = {
  gdaxClient: new Gdax.AuthenticatedClient(
    api.key,
    api.secret,
    api.passphrase,
    api.apiURI
  )
}
