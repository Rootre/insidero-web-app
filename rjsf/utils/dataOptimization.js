import omitBy from 'lodash/fp/omitBy'
import isUndefined from 'lodash/fp/isUndefined'
/**
 * Omits nested keys, only solid values remain
 * @param {object} formData
 * @returns {object}
 */
export function flattenFormData (formData) {
  const output = {}

  Object.keys(formData).forEach((key) => {
    if (typeof formData[key] === 'object') {
      Object.assign(output, {
        ...flattenFormData(formData[key]),
      })
    } else {
      Object.assign(output, {
        [key]: formData[key],
      })
    }
  })

  return output
}

export function omitUndefined (formData) {
  return omitBy(isUndefined, formData)
}
