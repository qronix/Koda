const express = require('express')
const router = express.Router()
const { network } = require('../apis/network')
const _ = require('lodash')

router.post('/register', async function register (req, res, next) {
  const body = _.pick(req.body, ['username', 'password', 'password_confirm', 'email'])
  const response = await network.post('/register', body)
  console.log(response)
})

module.exports = router
