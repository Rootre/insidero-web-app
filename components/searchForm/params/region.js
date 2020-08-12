const region = (t, { regions, formData: { country = 1 } }) => ({
  type: 'number',
  title: t('regionTitle'),
  default: regions.filter(({ country: { id } }) => id === country)[0].general.id,
  enum: regions.filter(({ country: { id } }) => id === country).map(({ general: { id } }) => id),
  enumNames: regions.filter(({ country: { id } }) => id === country).map(({ general: { name } }) => name),
})

export default region