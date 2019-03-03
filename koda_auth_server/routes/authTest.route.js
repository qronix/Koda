const express = require('express')
const router  = express.Router()
const {verifyRequest} = require('../middleware/verifyRequest')
const auth = require('../middleware/auth')

router.get('/auth',verifyRequest,auth.required,function(req,res,next){
    try{
        res.status(200).json({
            success:'You are authorized to be here :)',
            payload:{
                content:'Hello Client!'
            }
        })
    }catch(err){
        console.log(err)
        res.redirect('/')
    }
})