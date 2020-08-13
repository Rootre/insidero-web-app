import { useCallback, useContext, useState } from 'react'
import { useMutation } from 'react-query'
import { searchOffer } from '@/consts/urls'
import OfferList from '@/components/searchForm/OfferList'
import Form from '@/components/searchForm/Form'
import { CodeLists } from '@/contexts/codeLists'
import schema from '@/components/searchForm/schema'
import { withTranslation } from '@/i18n/instance'
import flattenFormData from '@/rjsf/flattenFormData'
import getCurrentRegions from '@/components/searchForm/utils/getCurrentRegions'

const fetchOffers = data => {
  const getParams = new URLSearchParams(data).toString()

  return fetch(`${searchOffer}?${getParams}`).then(data => data.json())
}

const SearchForm = ({ t }) => {
  const {countries, regions} = useContext(CodeLists)
  const [formData, setFormData] = useState({})
  const [mutate, {isLoading, data}] = useMutation(fetchOffers)

  const onSubmit = useCallback(({ formData }) => {
    setFormData(formData)
    return mutate(flattenFormData(formData))
  }, [])

  const onChange = useCallback(({ formData }) => {
    const currentRegions = getCurrentRegions(regions, formData)

    setFormData({
      ...formData,
      region: currentRegions.length > 0 ? currentRegions[0].general.id : undefined,
    })
  }, [])

  const currentRegions = regions.filter(({ country: { id } }) => id === formData.country)

  const formSchema = schema(t, {
    countries,
    regions: getCurrentRegions(regions, formData),
  })

  return (
    <>
      <Form
        onSubmit={onSubmit}
        onChange={onChange}
        formData={formData}
        isLoading={isLoading}
        buttonText={t('sendButton')}
        schema={formSchema}
      />
      <OfferList data={data}/>
    </>
  )
}

export default withTranslation('searchForm')(SearchForm)