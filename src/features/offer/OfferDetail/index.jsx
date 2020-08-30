import flow from 'lodash/fp/flow'
import getOr from 'lodash/fp/getOr'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import { withTranslation } from '@/i18n/instance'
import PriceComponent from '@/components/core/Price'
import Amenities from '@/features/offer/OfferDetail/Amenities'
import { formatNumber } from '@/prototypes/Price'

// selectors
const getAmenities = getOr({}, 'amenities')
const getSpace = getOr({}, 'space')
const getFullSpace = flow(getSpace, getOr('', 'room.full'))
const getCurrentPrice = type => getOr(0, `price.${type}.current`)
const getPricePerSquareMeter = type => getOr(0, `price.${type}.perSquareMeter`)

function OfferDetail ({ data, t }) {
  const { general } = data
  const { active, url, offer, type } = general
  const fullSpace = getFullSpace(data)
  const space = getSpace(data)
  const maxSpace = space.hasOwnProperty(type) ? getOr(0, `space.${type}.max`)(data) : getOr(0, 'space.usable.max')(data)
  const currentPrice = getCurrentPrice(offer)(data)
  const pricePerSquareMeter = getPricePerSquareMeter(offer)(data)
  const amenities = getAmenities(data)

  // console.log('OfferDetail', data)

  return (
    <Box
      p={2}
      my={3}
      border={1}
      borderRadius={5}
      borderColor={'primary.main'}
      bgcolor={'grey.50'}
      active={active}
    >
      <Button style={{ float: 'right' }} variant={'outlined'} color={'secondary'} href={url}>{t('details')}</Button>
      <h3 style={{marginTop: 0}}>
        {t(`offerDetailType:${type}`)} {fullSpace ? `${fullSpace}, ` : ''}{formatNumber(maxSpace)} m<sup>2</sup>
      </h3>
      <Grid container>
        <Grid xs={5} container>
          <Grid xs={4} item>{t('price')}</Grid>
          <Grid xs={8} item>
            <PriceComponent value={currentPrice}/>{' '}
            (<PriceComponent value={pricePerSquareMeter}/> m<sup>2</sup>)
          </Grid>
        </Grid>
        <Grid xs={5} container>
          <Grid xs={4} item>{t('estimateRent')}</Grid>
          <Grid xs={8} item>?</Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid xs={5} container>
          <Grid xs={4} item>{t('daysOnMarket')}</Grid>
          <Grid xs={8} item>?</Grid>
        </Grid>
        <Grid xs={5} container>
          <Grid xs={4} item>{t('returnIn')}</Grid>
          <Grid xs={8} item>?</Grid>
        </Grid>
      </Grid>
      <Box borderTop={1} mt={2} pt={2} borderColor={'text.disabled'}>
        <Amenities amenities={amenities}/>
      </Box>
    </Box>
  )
}

export default withTranslation('offerDetail', 'offerDetailType')(OfferDetail)