const express = require('express')
const router = express.Router()
const { network } = require('../apis/network')
const { verifyRegisterData } = require('../middleware/verifyRegisterData')
const { verifyLoginData } = require('../middleware/verifyLoginData')
const ApplicationError = require('../_helpers/applicationError')
const AUTHKEY = process.env.AUTHKEY

router.post('/register', verifyRegisterData, async function register (req, res, next) {
  try {
    console.log(req.body.user)
    const response = await network.post('/register', { user: { ...req.body.user }, AUTHKEY })
    if (!response) {
      return next(new ApplicationError('Could not register'))
    } else {
      if (response.status === 200) {
        res.status(200).json({ success: 'Successfully registered', user: response.data })
      }
    }
  } catch (err) {
    console.log(err)
    if (err.response) {
      if (err.response.status === 500 || err.response.status === 422) {
        return next(new ApplicationError(err.response.data.error))
      }
    }
    return next(new ApplicationError('A network error occurred'))
  }
})

router.post('/login', verifyLoginData, async function login (req, res, next) {
  // verify login data
  try {
    const response = await network.post('/login', { user: { ...req.body.user }, AUTHKEY })
    if (!response) {
      return next(new ApplicationError('Could not login'))
    } else {
      if (response.status === 200) {
        // need to handle JWT?
        res.status(200).json({ success: 'Logged in successfully', ...response.data })
      }
    }
  } catch (err) {
    console.log(err.response.status)
    if (err.response.status === 500) {
      return next(new ApplicationError(err.response.data))
    }
    if (err.response.status === 400) {
      return next(new ApplicationError(err.response.data.error))
    }
    return next(new ApplicationError('Could not login'))
  }
  // send request to auth server
  // receive request from auth
  // handle success
  // handle error
  // handle explosion
})

module.exports = router
