import { useState } from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { useCenteredFlex } from '@/mui/container'
import { withTranslation } from '@/i18n/instance'
import { formatNumber } from '@/prototypes/Price'

import OfferDetail from '../OfferDetail'

function OfferList ({ offers, offersInfo, fetchMore, chips, isLoading, t }) {
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(limit)
  const classes = useCenteredFlex()

  console.log('chips', chips)

  if (offers.length === 0) {
    return null
  }

  const handleFetchMore = () => {
    fetchMore(limit, offset)
    setOffset(offset => offset + limit)
  }

  return (
    <Container maxWidth={'md'}>
      <h2>{t('heading', { count: formatNumber(offersInfo.results) })}</h2>

      {offers.map(offer => (
        <OfferDetail key={offer.general.id} data={offer}/>
      ))}

      <div className={classes.root}>
        <Button
          color={'primary'}
          variant={'contained'}
          size={'large'}
          type={'submit'}
          disabled={isLoading}
          onClick={handleFetchMore}
        >
          {t('fetchMore')}
        </Button>
      </div>
    </Container>
  )
}

export default withTranslation('offerList')(OfferList)