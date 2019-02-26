const ApplicationError = require('../_helpers/applicationError')
const _ = require('lodash')
const validator = require('validator')
const ITEMS_IN_REGISTER_OBJECT = 4
const USERNAME_LENGTH_MIN = 5
const PASSWORD_LENGTH_MIN = 8

const verifyRegisterData = function (req, res, next) {
  const { user } = req.body
  const { password, password_confirm } = user
  let { username, email } = user
  let sanitizedUser = {}
  //    check length of body object
  if (_.size(user) !== ITEMS_IN_REGISTER_OBJECT) {
    return next(new ApplicationError('Registration form is not complete'))
  }
  //    verify username length
  if (username.length < USERNAME_LENGTH_MIN) {
    return next(new ApplicationError('Username is too short'))
  } else {
    sanitizedUser.username = username.toLowerCase()
  }
  //    verify password length
  if (password.length < PASSWORD_LENGTH_MIN) {
    return next(new Error('Password is too short'))
  }
  //    verify password and password_confirm match
  if (password !== password_confirm) {
    return next(new Error('Passwords do not match'))
  } else {
    sanitizedUser.password = password
  }
  //    verify email is a valid email
  if (!validator.isEmail(email)) {
    return next(new Error('Email is not valid'))
  } else {
    sanitizedUser.email = email.toLowerCase()
  }
  req.body.user = sanitizedUser
  // req.body = _.omit(req.body, ['password_confirm'])
  next()
}

module.exports = { verifyRegisterData }
