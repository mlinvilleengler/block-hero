const { gdaxClient } = require('./client')
const { delay } = require('../lib/util')

const getFulfilledOrder = async id => {
  const order = await new Promise((resolve, reject) =>
    gdaxClient.getOrder(id, (error, response, data) => {
      if (error) return reject(error)
      if (response.statusCode !== 200) return reject(data)
      resolve(data)
    })
  )

  if (order.done_reason === 'filled') {
    return order
  }

  await delay(5000)

  return await getFulfilledOrder(id)
}

module.exports = {
  getFulfilledOrder
}
