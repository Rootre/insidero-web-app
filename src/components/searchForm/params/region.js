const region = (t, { regions }) => ({
  type: 'number',
  title: t('regionTitle'),
  default: regions.length > 0 ? regions[0].general.id : 0,
  enum: regions.map(({ general: { id } }) => id),
  enumNames: regions.map(({ general: { name } }) => name),
})

export default region