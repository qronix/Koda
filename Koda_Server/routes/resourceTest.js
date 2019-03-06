const express = require('express')
const router = express.Router()
const { verifyAuth } = require('../middleware/verifyAuth')

router.get('/resourceTest', verifyAuth, function (req, res, next) {
  res.status(200).json({
    payload: {
        content: 'YOOOOOO'
    }
  })
})

module.exports = router
