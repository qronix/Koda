require ('./config')

const express = require('express')
const _ = require('lodash')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3002
const {db} = require('./db')
const {User} = require('./db/models/user')
const register = require('./routes/register.route')
const login = require('./routes/login.route')
const authTest = require('./routes/authTest.route')
const session = require('express-session')
require('./config/passport')

app.use(bodyParser.json())
app.use(session({secret:'yoloswagforjesus', cookie:{maxAge: 60000}, resave:false, saveUninitialized: false}))
app.use(register)
app.use(login)
app.use(authTest)
app.use(function(err,req,res,next){
    res.send(err)
})
app.listen(PORT, () => {
    console.log(`Auth server listening on port ${PORT}`)
})