import { useCallback, useContext, useState } from 'react'
import { useMutation } from 'react-query'
import { searchOffer } from '@/consts/urls'
import OfferList from '@/components/searchForm/OfferList'
import Form from '@/components/searchForm/Form'
import { CodeLists } from '@/contexts/codeLists'
import schema from '@/components/searchForm/schema'
import { withTranslation } from '@/i18n/instance'
import flattenFormData from '@/rjsf/flattenFormData'

const fetchOffers = data => {
  const getParams = new URLSearchParams(data).toString()

  return fetch(`${searchOffer}?${getParams}`).then(data => data.json())
}

const SearchForm = ({ t }) => {
  const {countries} = useContext(CodeLists)
  const [formData, setFormData] = useState({})
  const [mutate, {isLoading, data}] = useMutation(fetchOffers)

  const onSubmit = useCallback(({ formData }) => {
    setFormData(formData)
    return mutate(flattenFormData(formData))
  }, [])

  const onChange = useCallback(({ formData }) => setFormData(formData), [])

  const formSchema = schema(t, {
    countries,
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