export default function (data) {
  const countries = new Map()
  const regions = new Map()
  const cities = new Map()

  const neighborhoods = data.map(({general, city, region, country}) => {
    countries.set(country.id, country)
    regions.set(region.id, {
      ...region,
      belongsTo: country.id,
    })
    cities.set(city.id, {
      ...city,
      belongsTo: region.id,
    })

    return ({
      ...general,
      belongsTo: city.id,
    })
  })

  return {
    countries: [...countries.values()],
    regions: [...regions.values()],
    cities: [...cities.values()],
    neighborhoods,
  }
}