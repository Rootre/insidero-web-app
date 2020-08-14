export default {
  limit: {
    'ui:widget': 'hidden',
  },
  priceSellMax: {
    'ui:widget': 'range',
  },
  priceSellMin: {
    'ui:widget': 'range',
  },
  room: {
    'ui:widget': 'range',
  },
  floor: {
    'ui:widget': 'range',
  },
  gps: {
    'ui:field': 'geoPosition',
  },
  priceSell: {
    'ui:field': 'rangeSlider',
    'displayLabel': val => `${val / 1000000} mil.`,
  },
  space: {
    'ui:field': 'rangeSlider',
  },
  countryWithInteractiveRegion: {
    'ui:field': 'countryWithInteractiveRegion',
  },
}