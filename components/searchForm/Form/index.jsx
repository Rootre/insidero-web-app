import {memo} from 'react'
import Form from '@rjsf/core'
import schema from '@/components/searchForm/schema'
import uiSchema from '@/components/searchForm/uiSchema'
import { withTranslation } from '@/i18n/instance'

const FormComponent = ({ formData, onSubmit, isLoading, t }) => {
  return (
    <Form
      schema={schema(t)}
      uiSchema={uiSchema}
      formData={formData}
      onSubmit={onSubmit}
      onChange={({formData}) => console.log(formData)}
      liveValidate
      omitExtraData
    >
      <button type={'submit'} disabled={isLoading}>{t('sendButton')}</button>
    </Form>
  )
}

export default withTranslation('searchForm')(memo(FormComponent))