const space = t => ({
  type: 'object',
  title: t('spaceTitle'),
  getValue: (spaceMin, spaceMax) => `${spaceMin} - ${spaceMax} m2`,
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