import { useMutation } from 'react-query'

import { searchOffer } from '@/consts/urls'

import OfferList from '@/components/searchForm/OfferList'
import Form from '@/components/searchForm/Form'
import { useCallback, useState } from 'react'

const fetchOffers = data => {
  const getParams = new URLSearchParams(data).toString()

  return fetch(`${searchOffer}?${getParams}`).then(data => data.json())
}

const SearchForm = () => {
  const [formData, setFormData] = useState({})
  const [mutate, {isLoading, data}] = useMutation(fetchOffers)
  const onSubmit = useCallback(({ formData }) => {
    setFormData(formData)
    return mutate(formData)
  }, [])
  const onChange = useCallback(({ formData }) => {
    setFormData(formData)
  }, [])

  return (
    <>
      <Form
        onSubmit={onSubmit}
        onChange={onChange}
        formData={formData}
        isLoading={isLoading}
      />
      <OfferList data={data}/>
    </>
  )
}

export default SearchForm