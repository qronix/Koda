const express = require('express')
const router = express.Router()
const { verifyAuth } = require('../middleware/verifyAuth')

router.get('/resourceTest', verifyAuth, function (req, res, next) {
  res.status(200).json({
    success: 'You are allowed to be here!'
  })
})

module.exports = router
