import styled from '@emotion/styled'
import getOr from 'lodash/fp/getOr'
import flow from 'lodash/fp/flow'
import WeekendIcon from '@material-ui/icons/Weekend'
import ApartmentIcon from '@material-ui/icons/Apartment'
import HomeIcon from '@material-ui/icons/Home'
import SelectAllIcon from '@material-ui/icons/SelectAll'

import { withTranslation } from '@/i18n/instance'
import PriceComponent from '@/components/core/Price'

const Wrapper = styled.div`
  background: ${({ active }) => active ? 'white' : 'lightgray'};
  border-bottom: 1px solid gray;
  margin: 1em 0;
  padding: 1em 0;
`

const Inactive = styled.p`
  float: right;
  font-weight: 700;
`

// selectors
const getAmenities = getOr({}, 'amenities')
const getFloor = flow(getAmenities, getOr('', 'floor'))
const getGeneral = getOr({}, 'general')
const getSpace = getOr({}, 'space')
const getFullSpace = flow(getSpace, getOr('', 'room.full'))
const getUsableSpace = flow(getSpace, getOr(0, 'usable.max'))
const getPrice = getOr({}, 'price')

const iconMap = {
  flat: WeekendIcon,
  house: HomeIcon,
  land: SelectAllIcon,
  commercial: ApartmentIcon,
}

function OfferDetail ({ data, t }) {
  const { general, price } = data
  const { active, url, offer, type } = general
  const fullSpace = getFullSpace(data)
  const usableSpace = getUsableSpace(data)
  const floor = getFloor(data)

  console.log('OfferDetail', data)

  const currentPrice = price && price.hasOwnProperty(offer)
    ? price[offer].current
    : 0

  const Icon = iconMap.hasOwnProperty(type) ? iconMap[type] : null

  return (
    <Wrapper active={active}>
      {!active && <Inactive>{t('inactive')}</Inactive>}
      <dl>
        <dt>{t('type')}</dt>
        <dd><Icon color={'primary'}/> {t(`offerDetailType:${type}`)}</dd>
        <dt>{t('floor')}</dt>
        <dd>{floor}</dd>
        <dt>{t('rooms')}</dt>
        <dd>{fullSpace}</dd>
        <dt>{t('space')}</dt>
        <dd>{usableSpace} m<sup>2</sup></dd>
        <dt>{t('price')}</dt>
        <dd><PriceComponent value={currentPrice}/></dd>
        <dt>Link</dt>
        <dd><a href={url} target={'_blank'}>{url}</a></dd>
      </dl>
    </Wrapper>
  )
}

export default withTranslation('offerDetail', 'offerDetailType')(OfferDetail)