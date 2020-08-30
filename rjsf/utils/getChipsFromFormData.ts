import {type} from "os";

type SchemaType = {
  title: string,
  enum?: string | number[],
  enumNames?: string[],
}
type ValueType = string | number
type TypeType = string

type SchemasType = {
  schema: SchemasType,
  type: TypeType,
  value: ValueType,
}[]

type ChipsType = {
  title: string,
  value: string | number,
  type: string,
}[]

function getSchemasFromFormData(formData, formSchema): SchemasType {
  let schemas: SchemasType = []

  const dataSchema = formSchema.properties

  Object.keys(formData).forEach(key => {
    if (typeof formData[key] === 'object') {
      if (dataSchema[key].getValue) {
        const data = Object.values(formData[key])

        if (data.length === 0) {
          return
        }

        schemas.push({
          type: key,
          schema: {
            title: formSchema.title,
            ...dataSchema[key],
          },
          value: dataSchema[key].getValue(...data),
        })
      } else {
        schemas = [...schemas, ...getSchemasFromFormData(formData[key], dataSchema[key])]
      }
    } else {
      schemas.push({
        type: key,
        schema: {
          title: formSchema.title,
          ...dataSchema[key],
        },
        value: formData[key],
      })
    }
  })

  return schemas
}

function getValue(value, schema: SchemaType, uiSchema) {
  return schema.enumNames && schema.enum ? schema.enumNames[schema.enum.indexOf(value)] : value
}

function getChipsFromFormData(formData, formSchema, uiSchema) {
  console.log(formData, formSchema, uiSchema)
  const schemas: SchemasType = getSchemasFromFormData(formData, formSchema)

  const chips: ChipsType = schemas.map(({value, schema, type}) => ({
    value: getValue(value, schema, uiSchema),
    title: schema.title,
    type,
  }))

  return chips
}


export default getChipsFromFormData