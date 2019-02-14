const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true, validate:{
        validator: validator.isEmail,
        message:'{VALUE} is not a valid email'
    }},
    created: {type: Date, default: Date.now}
})

module.exports = mongoose.model('User', userSchema)