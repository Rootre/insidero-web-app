const room = t => ({
  type: 'number',
  title: t('roomTitle'),
  default: 1,
  minimum: 1,
  maximum: 10,
})

export default room