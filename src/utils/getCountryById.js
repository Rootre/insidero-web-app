const getCountryById = function (id, countries) {
  return countries.find(({general: {id: countryId}}) => countryId === id)
}

export default getCountryById