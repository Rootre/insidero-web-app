import {memo} from 'react'
import Form from '@rjsf/material-ui'
import styled from '@emotion/styled'
import Button from '@material-ui/core/Button'

import schema from '@/components/searchForm/schema'
import uiSchema from '@/components/searchForm/uiSchema'
import { withTranslation } from '@/i18n/instance'

const FormWrapper = styled.div`
  max-width: 500px;
  margin: 2em auto;
`

const FormComponent = ({ formData, onSubmit, isLoading, t }) => {
  // Unfortunately, ssr does not work for material-ui so far
  if (typeof window === 'undefined') {
    return null
  }

  return (
    <FormWrapper>
      <Form
        schema={schema(t)}
        uiSchema={uiSchema}
        formData={formData}
        onSubmit={onSubmit}
        liveValidate
        omitExtraData
      >
        <Button
          color={'primary'}
          variant={'contained'}
          size={'large'}
          type={'submit'}
          disabled={isLoading}
        >
          {t('sendButton')}
        </Button>
      </Form>
    </FormWrapper>
  )
}

export default withTranslation('searchForm')(memo(FormComponent))