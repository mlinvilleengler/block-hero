module.exports = {
  BUY: 'BUY',

  SELL: 'SELL',

  delay: duration =>
    new Promise(
      resolve =>
        (process.env.NODE_ENV === 'historical'
          ? setTimeout(resolve, duration * 0.00001)
          : setTimeout(resolve, duration))
    ),

  round: (num, op = 100) => {
    num = num * op
    num = Math.round(num)
    return num / op
  }
}
