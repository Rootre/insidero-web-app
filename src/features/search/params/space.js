const space = t => ({
  type: 'object',
  title: t('spaceTitle'),
  properties: {
    spaceMin: {
      type: 'number',
      minimum: 10,
      multipleOf: 10,
    },
    spaceMax: {
      type: 'number',
      maximum: 200,
    }
  }
})

export default space