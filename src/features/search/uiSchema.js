export default {
  active: {
    'ui:widget': 'hidden',
  },
  limit: {
    'ui:widget': 'hidden',
  },
  offer: {
    'ui:widget': 'hidden',
  },
  type: {
    'ui:widget': 'chooseType',
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