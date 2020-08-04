const countries = [
  'Česko',
  'Polsko',
  'Slovensko',
  'Německo',
]
const countryValues = Array.from(Array(countries.length), (_, i) => i + 1)

const country = t => ({
  type: 'number',
  title: t('countryTitle'),
  default: 1,
  enum: countryValues,
  enumNames: countries
})

export default country