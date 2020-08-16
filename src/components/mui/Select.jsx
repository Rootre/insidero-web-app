import SelectWidget from '@/components/mui/SelectWidget'
import { FieldTemplate } from '@rjsf/material-ui'

const Select = ({props, id, label, multiple = false, onChange, options, schema, value}) => (
  <FieldTemplate>
    <SelectWidget
      {...props}
      id={id}
      schema={schema}
      uiSchema={{}}
      value={value}
      options={options}
      onChange={onChange}
      label={label}
      multiple={multiple}
    />
  </FieldTemplate>
)

export default Select