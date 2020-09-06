import pickBy from 'lodash/fp/pickBy'
import isUndefined from 'lodash/fp/isUndefined'
import isEmpty from 'lodash/fp/isEmpty'
import isNumber from 'lodash/fp/isNumber'
import isBoolean from 'lodash/fp/isBoolean'

export function omitUndefined (formData) {
  return pickBy(val => isNumber(val) || isBoolean(val) || !isEmpty(val) && !isUndefined(val), formData)
}