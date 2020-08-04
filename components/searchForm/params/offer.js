const offer = t => ({
  type: 'string',
  title: t('offerTitle'),
  default: 'sell',
  enum: ['sell', 'rent'],
  enumNames: [t('offerSell'), t('offerRent')],
})

export default offer