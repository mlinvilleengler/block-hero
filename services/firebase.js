const admin = require('firebase-admin')
const serviceAccount = require('../firebase-config.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://coinmaker-fd2e5.firebaseio.com'
})

const db = admin.database()
const targetRef = id => db.ref(`${id}/target`)
const marketRef = id => db.ref(`${id}/market_logs`)
const transactionRef = id => db.ref(`${id}/transaction_logs`)
const priceRef = db.ref('price_logs')
const errorRef = db.ref('error_logs')

let oldPrice = 0

module.exports = {
  getLastTransaction: id =>
    new Promise(resolve => {
      transactionRef(id).limitToLast(1).on('value', data => {
        data.forEach(d => resolve(d.val()))
        resolve(null)
      })
    }),

  setTarget: (id, t) => targetRef(id).set(t),

  marketLog: (id, l) => marketRef(id).push(l),

  transactionLog: (id, t) => transactionRef(id).push(t),

  getPriceLog: () =>
    new Promise(resolve => {
      priceRef.on('value', data => {
        let priceArray = []
        data.forEach(d => {
          priceArray.push(d.val())
          priceArray.push(d.val())
          priceArray.push(d.val())
        })
        console.log('priceArray', priceArray)
        resolve(priceArray)
      })
    }),

  priceLog: price => {
    if (process.env.NODE_ENV !== 'production') return
    if (price !== oldPrice) {
      priceRef.push({
        price,
        time: new Date().getTime()
      })
    }
    oldPrice = price
  },

  errorLog: e => {
    console.log(e)
    errorRef.push({
      ...e,
      time: new Date().getTime()
    })
  }
}
