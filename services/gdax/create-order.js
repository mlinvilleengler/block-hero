module.exports = {
  createOrder: (tradeFunction, options) =>
    new Promise((resolve, reject) =>
      tradeFunction(options, (error, response, data) => {
        if (error) return reject(error)
        if (response.statusCode !== 200) return reject(data)
        return resolve(data.id)
      })
    )
}
