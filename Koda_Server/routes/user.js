const express = require('express')
const router = express.Router()
const { network } = require('../apis/network')
const { verifyRegisterData } = require('../middleware/verifyRegisterData')
const ApplicationError = require('../_helpers/applicationError')

router.post('/register', verifyRegisterData, async function register (req, res, next) {
  try {
    const response = await network.post('/register', req.body)
    if (!response) {
      return next(new ApplicationError('Could not register'))
    } else {
      if (response.status === 200) {
        res.status(200).send('Registration complete')
      }
    }
  } catch (err) {
    if (err.response.status === 500) {
      return next(new ApplicationError(err.response.data))
    }
    return next(new ApplicationError('A network error occurred'))
  }
})

module.exports = router
