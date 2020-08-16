import { memo } from 'react'
import Form from '@rjsf/material-ui'
import styled from '@emotion/styled'

import uiSchema from '@/components/searchForm/uiSchema'
import fields from '@/rjsf/fields'
import widgets from '@/rjsf/widgets'

const StyledForm = styled.div`
  max-width: 500px;
  margin: 2em auto;
`

const FormComponent = ({ button, formData, onSubmit, onChange, schema }) => {
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
        widgets={widgets}
      >
        {button}
      </Form>
    </StyledForm>
  )
}

export default memo(FormComponent)