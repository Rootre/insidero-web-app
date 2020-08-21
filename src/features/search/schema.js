import active from './params/active'
import country from './params/country'
import floor from './params/floor'
import limit from './params/limit'
import offer from './params/offer'
import room from './params/room'
import region from './params/region'
import space from './params/space'
import type from './params/type'
import priceSell from '@/features/search/params/priceSell'
import city from '@/features/search/params/city'

const schema = t => ({
  title: t('title'),
  // description: t('description'),
  type: 'object',
  required: [
    'type',
  ],
  properties: {
    active: active(t),
    offer: offer(t),
    type: type(t),
    countryWithInteractiveRegion: {
      type: 'object',
      properties: {
        country: country(t),
        region: region(t),
        city: city(t),
      },
    },
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