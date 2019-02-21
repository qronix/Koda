const _ = require('lodash')
const errorName = 'ValidationError'
const ucfirst = require('../_helpers/ucfirst')

function constructError(err){
    if(err){
        try{
            if(err.name === errorName){
                const errorTypes = Object.keys(err.errors)
                const errorCausingKey = ucfirst(err.errors[errorTypes[0]].path)
                return(`${errorCausingKey} is already in use`)
            }
        }catch(error){
            return('A database error occurred')
        }
    }
}

module.exports = constructError