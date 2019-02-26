const ApplicationError = require('../_helpers/applicationError')

const verifyLoginData = function (req, res, next) {
  const { username, password } = req.body.user
  if (!username) {
    return next(new ApplicationError('Username is required'))
  }
  if (!password) {
    return next(new ApplicationError('Password is required'))
  }
  next()
}

module.exports = { verifyLoginData }
