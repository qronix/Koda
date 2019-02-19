const express = require('express')
const router = express.Router()
const { network } = require('../apis/network')
const { verifyRegisterData } = require('../middleware/verifyRegisterData')
const ApplicationError = require('../_helpers/applicationError')

router.post('/register', verifyRegisterData, async function register (req, res, next) {
  try {
    const response = await network.post('/register', req.body)
    if (!response) {
      next(new ApplicationError('Shit!'))
    } else {
      res.send('YOLO!')
    }
  } catch (err) {

  }

})

module.exports = router
