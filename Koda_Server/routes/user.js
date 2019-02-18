const express = require('express')
const router = express.Router()
const { network } = require('../apis/network')
const { verifyRegisterData } = require('../middleware/verifyRegisterData')

router.post('/register', verifyRegisterData, async function register (req, res, next) {
  // const response = await network.post('/register', req.body)
  // res.send(response.data)
  // console.log(response.data)
})

module.exports = router
