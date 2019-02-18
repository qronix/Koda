const ApplicationError = require('../_helpers/applicationError')
const _ = require('lodash')
const validator = require('validator')
const ITEMS_IN_REGISTER_OBJECT = 4
const USERNAME_LENGTH_MIN = 5
const PASSWORD_LENGTH_MIN = 8

const verifyRegisterData = function (req, res, next) {
  const body = _.pick(req.body, ['username', 'password', 'password_confirm', 'email'])
  const { username, password, password_confirm, email } = body
  //    check length of body object
  if (_.size(req.body) !== ITEMS_IN_REGISTER_OBJECT) {
    return next(new ApplicationError('Registration form is not complete'))
  }
  //    verify username length
  if (username.length < USERNAME_LENGTH_MIN) {
    return next(new ApplicationError('Username is too short'))
  }
  //    verify password length
  if (password.length < PASSWORD_LENGTH_MIN) {
    return next(new Error('Password is too short'))
  }
  //    verify password and password_confirm match
  if (password !== password_confirm) {
    return next(new Error('Passwords do not match'))
  }
  //    verify email is a valid email
  if (!validator.isEmail(email)) {
    return next(new Error('Email is not valid'))
  }
  next()
}

module.exports = { verifyRegisterData }
