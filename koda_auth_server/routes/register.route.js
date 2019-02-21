const express = require('express')
const router = express.Router()
const User = require('../db/models/user')
const constructError = require('../_helpers/constructError')

//add middleware to validate the register request originated from
//the resource server and not from a third party
router.post('/register', async (req,res,next)=>{
   const user = new User(req.body)
   try{
    const createdUser = await user.save()
    if(createdUser.username){
        res.status(200).send('Registration complete')
    }
   } catch (err) {
       const errorMessage = constructError(err)
       res.status(500).send(errorMessage)
   }
})

module.exports = router 