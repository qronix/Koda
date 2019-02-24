const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = mongoose.model('User')

passport.use(new LocalStrategy({
    usernameField: 'user[username]',
    passwordField: 'user[password]',

}, async (username, password, done)=>{
    try{
        const user = await User.findOne({username})
        if(!user || !user.validatePassword(password)){
            return done(null, false, {errors:{'Username or Password': 'is invalid'}})
        }
        return done(null,user)
    }catch(err){
        console.log(err)
    }
}
))