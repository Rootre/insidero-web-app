const type = t => ({
  type: 'string',
  title: t('typeTitle'),
  default: 'flat',
  enum: ['flat', 'house', 'land', 'commercial'],
  enumNames: [t('typeFlat'), t('typeHouse'), t('typeLand'), t('typeCommercial')],
})

export default type