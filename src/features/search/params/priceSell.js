const priceSell = t => ({
  type: 'object',
  title: t('priceSellTitle'),
  getValue: (priceSellMin, priceSellMax) => `${priceSellMin / 1000000} - ${priceSellMax / 1000000} mil.`,
  properties: {
    priceSellMin: {
      type: 'number',
      minimum: 0,
      multipleOf: 100000,
    },
    priceSellMax: {
      type: 'number',
      maximum: 20000000,
      multipleOf: 100000,
    }
  }
})

export default priceSell