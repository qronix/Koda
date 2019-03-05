const express = require('express')
const router  = express.Router()
const {verifyRequest} = require('../middleware/verifyRequest')
const auth = require('../middleware/auth')

router.post('/checkauth',verifyRequest,auth.required,function(req,res,next){
    console.log('YOLO')
    console.log(req.payload.id)
    if(req.payload.id) {
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
    } else {
        res.status(401).json({error:'User is not authorized'})
    }
})

module.exports = router