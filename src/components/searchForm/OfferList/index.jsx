import OfferDetail from '../OfferDetail'
import styled from '@emotion/styled'
import Button from '@material-ui/core/Button'
import { useState } from 'react'

const OfferWrapper = styled.div`
  max-width: 800px;
  margin: 2em auto;
`

function OfferList ({ offers, fetchMore, isLoading }) {
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(limit)

  if (offers.length === 0) {
    return null
  }

  const handleFetchMore = () => {
    fetchMore(limit, offset)
    setOffset(offset => offset + limit)
  }

  return (
    <OfferWrapper>
      {offers.map(offer => (
        <OfferDetail key={offer.general.id} data={offer}/>
      ))}
      <Button
        color={'primary'}
        variant={'contained'}
        size={'large'}
        type={'submit'}
        disabled={isLoading}
        onClick={handleFetchMore}
      >
         Načíst další
      </Button>
    </OfferWrapper>
  )
}

export default OfferList