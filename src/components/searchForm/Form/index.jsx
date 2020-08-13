import { memo } from 'react'
import Form from '@rjsf/material-ui'
import styled from '@emotion/styled'
import Button from '@material-ui/core/Button'

import uiSchema from '@/components/searchForm/uiSchema'
import fields from '@/rjsf/fields'

const StyledForm = styled.div`
  max-width: 500px;
  margin: 2em auto;
`

const FormComponent = ({ buttonText, formData, onSubmit, onChange, isLoading, schema }) => {
  // Unfortunately, ssr does not work for material-ui so far
  if (typeof window === 'undefined') {
    return null
  }

  return (
    <StyledForm>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        onSubmit={onSubmit}
        onChange={onChange}
        liveValidate
        omitExtraData
        showErrorList={false}
        fields={fields}
      >
        <Button
          color={'primary'}
          variant={'contained'}
          size={'large'}
          type={'submit'}
          disabled={isLoading}
        >
          {buttonText}
        </Button>
      </Form>
    </StyledForm>
  )
}

export default memo(FormComponent)