import Form from '@rjsf/core'

import schema from '../schema'
import uiSchema from '../uiSchema'

const log = (type) => console.log.bind(console, type)

function SearchForm () {
  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      onChange={log("changed")}
      onSubmit={log("submitted")}
      onError={log("errors")}
    />
  )
}

export default SearchForm