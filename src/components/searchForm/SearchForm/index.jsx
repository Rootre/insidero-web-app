import { useCallback, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { searchOffer } from '@/consts/urls'
import OfferList from '@/components/searchForm/OfferList'
import Form from '@/components/searchForm/Form'
import schema from '@/components/searchForm/schema'
import { withTranslation } from '@/i18n/instance'
import { flattenFormData, omitUndefined } from '@/rjsf/utils/dataOptimization'
import Button from '@material-ui/core/Button'

const fetchOffers = data => {
  const getParams = new URLSearchParams(data).toString()

  return fetch(`${searchOffer}?${getParams}`).then(data => data.json())
}

const SearchForm = ({ t }) => {
  const [formData, setFormData] = useState({})
  const [mutate, {isLoading, data}] = useMutation(fetchOffers)
  const formSchema = useMemo(() => schema(t),[])

  const onSubmit = useCallback(({ formData }) => {
    setFormData(formData)
    return mutate(omitUndefined(flattenFormData(formData)))
  }, [])
  const onChange = useCallback(({ formData }) => setFormData(formData), [])

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
      <OfferList data={data}/>
    </>
  )
}

export default withTranslation('searchForm')(SearchForm)