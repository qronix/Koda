const axios = require('axios')

const network = axios.create({
  baseURL: 'http://localhost:3002'
})

module.exports = { network }
