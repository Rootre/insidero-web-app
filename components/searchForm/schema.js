import active from './params/active'
import country from './params/country'
import floor from './params/floor'
import limit from './params/limit'
import offer from './params/offer'
import priceSellMin from './params/priceSellMin'
import priceSellMax from './params/priceSellMax'
import room from './params/room'
import type from './params/type'

const schema = t => ({
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
    country: country(t),
    limit,
    priceSellMin: priceSellMin(t),
    priceSellMax: priceSellMax(t),
    room: room(t),
  },
  dependencies: {
    type: {
      oneOf: [
        {
          properties: {
            type: {
              enum: ['flat']
            },
            floor: floor(t),
          }
        }
      ]
    }
  }
})

export default schema