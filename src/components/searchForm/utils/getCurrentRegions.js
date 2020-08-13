function getCurrentRegions(regions, formData) {
  return regions.filter(({ country: { id } }) => id === formData.country)
}

export default getCurrentRegions