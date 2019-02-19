const express = require('express')
const router = express.Router()
const User = require('../db/models/user')
const _ = require('lodash')

//add middleware to validate the register request originated from
//the resource server and not from a third party
router.post('/register', async (req,res)=>{
   const user = new User(req.body)
   try{
    const createdUser = await user.save()
    if(createdUser.username){
        console.log(`New user is called ${createdUser.username}`)
    }
   } catch (err) {
       console.log(err.message)
   }
})

module.exports = router