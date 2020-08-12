const country = (t, {countries}) => ({
  type: 'number',
  title: t('countryTitle'),
  default: 1,
  enum: countries.map(({general: {id}}) => id),
  enumNames: countries.map(({general: {name}}) => name),
})

export default country