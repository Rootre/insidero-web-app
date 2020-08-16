export default async (req, res) => {
  const { query: { country } } = req

  if (!country) {
    res.statusCode = 400
    res.json({ error: 'Country is not defined' })
  }

  const cleanCountry = encodeURIComponent(country)

  try {
    const data = await import(`@/data/topojson/${cleanCountry}.json`)

    res.statusCode = 200
    res.json({ ...data })
  } catch (e) {
    res.statusCode = 500
    res.json({ error: 'Map cannot be found' })
  }
}
