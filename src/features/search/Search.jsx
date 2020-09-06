import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { searchOffer } from '@/consts/urls'
import OfferList from '@/features/offer/OfferList'
import Form from '@/features/search/Form'
import schema from '@/features/search/schema'
import { i18n, withTranslation } from '@/i18n/instance'
import { flattenFormData, omitUndefined } from '@/rjsf/utils/dataOptimization'
import Button from '@material-ui/core/Button'
import basicFetch from '@/utils/basicFetch'

const SearchForm = ({ t }) => {
  const [mutate, {isLoading, data}] = useMutation(basicFetch(searchOffer, 'GET'))
  const [offers, setOffers] = useState([])
  const [offersInfo, setOffersInfo] = useState({})
  const [formData, setFormData] = useState({})
  const formSchema = useMemo(() => schema(t),[i18n.language])

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