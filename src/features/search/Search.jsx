import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { searchOffer } from '@/consts/urls'
import OfferList from '@/features/offer/OfferList'
import Form from '@/features/search/Form'
import schema from '@/features/search/schema'
import { withTranslation } from '@/i18n/instance'
import { flattenFormData, omitUndefined } from '@/rjsf/utils/dataOptimization'
import Button from '@material-ui/core/Button'

const fetchOffers = data => {
  const getParams = new URLSearchParams(data).toString()

  return fetch(`${searchOffer}?${getParams}`).then(data => data.json())
}

const SearchForm = ({ t }) => {
  const [offers, setOffers] = useState([])
  const [offersInfo, setOffersInfo] = useState({})
  const [formData, setFormData] = useState({})
  const [mutate, {isLoading, data}] = useMutation(fetchOffers)
  const formSchema = useMemo(() => schema(t),[])

  const onSubmit = useCallback(({ formData }) => {
    setOffers([])
    setOffersInfo({})
    setFormData(formData)
    return mutate(omitUndefined(flattenFormData(formData)))
  }, [])
  const onChange = useCallback(({ formData }) => setFormData(formData), [])

  const fetchMore = (limit, offset) => mutate({
    ...omitUndefined(flattenFormData(formData)),
    limit,
    offset,
  })

  useEffect(() => {
    if (!data) {
      return
    }
    setOffers(offers => ([...offers, ...Object.values(data.results)]))
    setOffersInfo(data.info)
  }, [data])

  return (
    <>
      <Form
        onSubmit={onSubmit}
        onChange={onChange}
        formData={formData}
        schema={formSchema}
        button={(
          <Button
            color={'primary'}
            variant={'contained'}
            size={'large'}
            type={'submit'}
            disabled={isLoading}
          >
            {t('sendButton')}
          </Button>
        )}
      />
      <OfferList
        isLoading={isLoading}
        fetchMore={fetchMore}
        offers={offers}
        offersInfo={offersInfo}
      />
    </>
  )
}

export default withTranslation('searchForm')(SearchForm)