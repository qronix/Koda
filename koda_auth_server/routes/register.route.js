const express = require('express')
const router = express.Router()
const passport = require('passport')
const {authRequest} = require('../middleware/authRequest')
const User = require('../db/models/user')
const constructError = require('../_helpers/constructError')
const auth = require('../middleware/auth')

//add middleware to validate the register request originated from
//the resource server and not from a third party
router.post('/register', authRequest, async function register(req,res,next){
    const {body: {user}} = req
    debugger
    if(!user.username){
        return res.status(422).json({
            error:'Username is required',
        })
    }

    if(!user.password){
        return res.status(422).json({
            error:'Password is required',
        })
    }
   
    
    try{
        const finalUser = new User(user)
        finalUser.setPassword(user.password)
    
        const confirmedUser = await finalUser.save()
        return res.json({user: confirmedUser.toAuthJSON()})
    }
    catch(err){
        const errorMessage = constructError(err)
        return res.status(422).json({
            error:errorMessage
        })
    }
})

module.exports = router 