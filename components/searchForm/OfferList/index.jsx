import OfferDetail from '../OfferDetail'

function OfferList ({ data }) {
  return (
    <div>
      {Object.values(data).map(offer => (
        <OfferDetail key={offer.general.id} data={offer}/>
      ))}
    </div>
  )
}

export default OfferList