import { withTranslation } from '@/i18n/instance'
import Price from '@/prototypes/Price'
import Currency from '@/prototypes/Currency'

const PriceComponent = ({ value, t }) => {
  const currencyName = t('name')
  const currencyISO = t('ISO')
  const currencyRate = parseFloat(t('rate'))

  const currency = new Currency(currencyName, currencyISO, currencyRate)
  const price = new Price(value, currency)

  return (
    <strong>{price.getFormattedValue()}</strong>
  )
}

export default withTranslation('price')(PriceComponent)