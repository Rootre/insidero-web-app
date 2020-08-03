import {model, models} from 'mongoose'

export default function getModel(name, schema) {
  if (models.hasOwnProperty(name)) {
    return models[name]
  }

  return model.call(this, ...arguments)
}