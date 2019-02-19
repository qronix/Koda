require('./config')
const express = require('express')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3000
const app = express()

const user = require('./routes/user')

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler())
}
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())
app.use(cors())
app.use(function (err, req, res, next) {
  console.log(err.message)
  res.status(400).send(err.message)
})
app.use(user)


// app.post('/login', (req, res) => {
//   res.send({ userId: 999999 })
// })

app.listen(PORT, () => {
  console.log('server started on port 3001')
})
