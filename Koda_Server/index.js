require('./config')
const express = require('express')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const app = express()

const user = require('./routes/user')
const resourceTest = require('./routes/resourceTest')

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler())
}
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())
app.use(cors())
app.use(user)
app.use(resourceTest)

app.use(function (err, req, res, next) {
  res.status(422).json({ error: err.message })
})

app.listen(PORT, () => {
  console.log('server started on port 3001')
})
