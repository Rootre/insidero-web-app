import pickBy from 'lodash/fp/pickBy'
import isUndefined from 'lodash/fp/isUndefined'
import isEmpty from 'lodash/fp/isEmpty'
import isNumber from 'lodash/fp/isNumber'

export function omitUndefined (formData) {
  return pickBy(val => isNumber(val) || !isEmpty(val) && !isUndefined(val), formData)
}