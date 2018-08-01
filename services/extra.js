// const getHistoricalPrice = async (id) => {
//   if (!botPriceIndex[id]) {
//     botPriceIndex[id] = 0
//   }

//   if (botPriceIndex[id] >= historicalPriceList.length) {
//     console.log(`bot ${id} done`)
//     const delay2 = (duration) => new Promise(resolve => setTimeout(resolve, duration))
//     return await delay2(20000000000000000000000)
//   }

//   const price = historicalPriceList[botPriceIndex[id]].price
//   botPriceIndex[id]++

//   return price

// }

// const getPrice = async (id) => {
//   // if (process.env.NODE_ENV === 'historical') {
//   //   return await getHistoricalPrice(id)
//   // }

// if (process.env.NODE_ENV === 'historical') {
//   historicalPriceList = await log.getPriceLog()
//   return
// }

// env = process.env.NODE_ENV === 'historical' ? 'historical' : env
