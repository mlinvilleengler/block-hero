const env = process.env.NODE_ENV !== 'production' ? 'dev' : ''

module.exports = {
  bots: [
    // {
    //   id: env + 'BOY',
    //   firstTierPercent: .0000
    // }
    {
      id: env + 'BOY1',
      firstTierPercent: 0.0035,
      secondTierPercent: 0.0005
    }
    // {
    //   id: env + 'v2-one',
    //   firstTierPercent: .001,
    // },
    // {
    //   id: env + 'v2-two',
    //   firstTierPercent: .0025,
    // },
    // {
    //   id: env + 'v2-three',
    //   firstTierPercent: .005,
    // },
    // {
    //   id: env + 'one',
    //   firstTierPercent: .001,
    //   secondTierPercent: .0005
    // },
    // {
    //   id: env + 'two',
    //   firstTierPercent: .005,
    //   secondTierPercent: .001
    // },
    // {
    //   id: env + 'three',
    //   firstTierPercent: .01,
    //   secondTierPercent: .001
    // },
    // {
    //   id: env + 'four',
    //   firstTierPercent: .05,
    //   secondTierPercent: .001
    // },
    // {
    //   id: env + 'five',
    //   firstTierPercent: .1,
    //   secondTierPercent: .001
    // },
  ]
}
