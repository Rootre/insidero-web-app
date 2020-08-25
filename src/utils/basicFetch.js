const basicFetch = (url, method) => async variables => {
  const opts = {
    method,
  }

  if (method === 'GET') {
    if (typeof variables === 'object') {
      const qs = new URLSearchParams(variables)
      url += `${url.indexOf('?') > -1 ? '&' : '?'}${qs.toString()}`
    }
  } else {
    Object.assign(opts, {
      body: JSON.stringify(variables)
    })
  }

  const result = await fetch(url, opts)
  const data = await result.json()

  if (!result.ok) {
    throw new Error(data.message)
  }

  return data
}

export default basicFetch