const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const uniqueValidator = require('mongoose-unique-validator')
const crypto = require('crypto')
const jwt  = require('jsonwebtoken')

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
        required: true
    },
    salt:{
        type: String,
        required: true
    },
    hash:{
        type: String,
        required: true
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
userSchema.plugin(uniqueValidator)

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(32).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 100000, 512, 'sha512').toString('hex')
}

userSchema.methods.validatePassword = function(password){
    const hash = crypto.pbkdf2Sync(password, this.salt, 100000, 512, 'sha512').toString('hex')
    return this.hash === hash
}

userSchema.methods.generateJWT = function(){
    const today = new Date()
    const expirationDate = new Date(today)
    expirationDate.setDate(today.getDate() + 60)

    return jwt.sign({
        username: this.username,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    },process.env.JWTSECRET)
}

userSchema.methods.toAuthJSON = function(){
    return{
        _id: this._id,
        username: this.username,
        token: this.generateJWT()
    }
}

module.exports = mongoose.model('User', userSchema)