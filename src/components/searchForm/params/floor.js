const floor = t => ({
  type: 'number',
  title: t('floorTitle'),
  default: 1,
  minimum: 1,
  maximum: 10,
})

export default floor