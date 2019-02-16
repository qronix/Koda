require ('./config')

const express = require('express')
const _ = require('lodash')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3002
const {db} = require('./db')
const {User} = require('./db/models/user')

app.use(bodyParser.json())

app.post('/register',(req,res) => {
    const body = (_.pick(req.body,["username","password","email"]))
    res.send(`I got your shit ${body.username}`)
})


app.listen(PORT, () => {
    console.log(`Auth server listening on port ${PORT}`)
})