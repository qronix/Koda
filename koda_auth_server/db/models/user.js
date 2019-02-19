const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')

const userSchema = new Schema({
    username: {
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        minlength: 5,
        maxlength: 15,
        validate:{
            validator: validator.isAlphanumeric,
            message: '{VALUE} is not alphanumeric'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    email: {
        type: String, 
        required: true, 
        unique: true, 
        validate:{
            validator: validator.isEmail,
            message:'{VALUE} is not a valid email'
        }
    },
    created: {type: Date, default: Date.now}
})

module.exports = mongoose.model('User', userSchema)