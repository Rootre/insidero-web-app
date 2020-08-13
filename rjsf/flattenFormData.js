/**
 * Omits nested keys, only solid values remain
 * @param {object} formData
 * @returns {object}
 */
function flattenFormData (formData) {
  const output = {};

  Object.keys(formData).forEach((key) => {
    if (typeof formData[key] === "object") {
      Object.assign(output, {
        ...flattenFormData(formData[key])
      });
    } else {
      Object.assign(output, {
        [key]: formData[key]
      });
    }
  });

  return output;
}

export default flattenFormData;
