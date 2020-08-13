import active from './params/active'
import country from './params/country'
import floor from './params/floor'
import limit from './params/limit'
import offer from './params/offer'
import room from './params/room'
import region from './params/region'
import space from './params/space'
import type from './params/type'
import priceSell from '@/components/searchForm/params/priceSell'

function _getRegion (t, data) {
  if (data.regions.length === 0) {
    return {}
  }

  return {
    region: region(t, data),
  }
}

const schema = (t, data) => ({
  title: t('title'),
  description: t('description'),
  type: 'object',
  required: [
    'type',
  ],
  properties: {
    active: active(t),
    type: type(t),
    offer: offer(t),
    country: country(t, data),
    ..._getRegion(t, data),
    limit,
    priceSell: priceSell(t),
    space: space(t),
  },
  dependencies: {
    type: {
      oneOf: [
        {
          properties: {
            type: {
              enum: ['flat'],
            },
            showRoom: {
              type: 'boolean',
              title: 'Vybrat počet pokojů',
            },
            showFloor: {
              type: 'boolean',
              title: 'Vybrat patro',
            },
          },
        },
        {
          properties: {
            type: {
              enum: ['house'],
            },
            showRoom: {
              type: 'boolean',
              title: 'Vybrat počet pokojů',
            },
          },
        },
      ],
    },
    showRoom: {
      oneOf: [
        {
          properties: {
            showRoom: {
              enum: [true],
            },
            room: room(t),
          },
        },
      ],
    },
    showFloor: {
      oneOf: [
        {
          properties: {
            showFloor: {
              enum: [true],
            },
            floor: floor(t),
          },
        },
      ],
    },
  },
})

export default schema