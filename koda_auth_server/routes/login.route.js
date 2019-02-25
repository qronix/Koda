const express = require('express')
const router = express.Router()
const passport = require('passport')
const auth = require('../middleware/auth')
const {authRequest} = require('../middleware/authRequest')
const User = require('../db/models/user')

router.post('/login',authRequest,auth.optional,async function(req,res, next){
    const {body:{user}} = req

    if(!user.username){
        return res.status(422).json({error:'Username is required'})
    }
    if(!user.password){
        return res.status(422).json({error:'Password is required'})
    }

    // user can be redirected via the passport option object
    return passport.authenticate('local',{session: false}, (err,passportUser)=>{
        if(err){
            return res.status(401).json({error:'Could not login'})
        }
        if(passportUser){
            const user = passportUser
            user.token = passportUser.generateJWT()

            return res.json({user:user.toAuthJSON()})
        }

        return res.status(400).json({error:'Invalid login credentials'})
    })(req,res,next)
})

module.exports = router