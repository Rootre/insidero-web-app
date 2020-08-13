import OfferDetail from '../OfferDetail'
import styled from '@emotion/styled'

const OfferWrapper = styled.div`
  max-width: 800px;
  margin: 2em auto;
`

function OfferList ({ data }) {
  if (!data || !data.results) {
    return null
  }

  return (
    <OfferWrapper>
      {Object.values(data.results).map(offer => (
        <OfferDetail key={offer.general.id} data={offer}/>
      ))}
    </OfferWrapper>
  )
}

export default OfferList