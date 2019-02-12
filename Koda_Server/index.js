require('./config')
const express = require('express')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler())
}
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())
app.use(cors())
app.post('/login', (req, res) => {
  res.send({ userId: 999999 })
})

app.listen(PORT, () => {
  console.log('server started on port 3001')
})
