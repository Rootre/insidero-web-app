const cookie = require('cookie')

module.exports = (req, res, next) => {
  // but only for page and api's requests
  if (req.url.match(/\/(static|_next)\//) || !req.headers.cookie) {
    return next()
  }

  const token = cookie.parse(req.headers.cookie)[cookieName]

  try {
    const data = jwt.verify(token, secret)

    const newToken = userHelper.login(data)

    res.cookie(cookieName, newToken, { maxAge: cookieMaxage })

    req.login = data.login
  } catch (e) {
  }

  next()
}