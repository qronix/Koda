const jwt = require('express-jwt')

const getTokenFromHeaders = (req,res) =>{
    const {headers: {authorization}} = req;
    if(authorization && authorization.split(' ')[0] === 'Token'){
        return authorization.split(' ')[1]
    }
    return null
}
debugger
const auth = {
    required: jwt({
        secret: process.env.JWTSECRET,
        userProperty: 'payload',
        getToken: getTokenFromHeaders
    }),
    optional: jwt({
        secret: process.env.JWTSECRET,
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        credentialsRequired: false
    })
}

module.exports = auth

