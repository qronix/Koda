
const verifyRequest = function(req,res,next){
    const REQUESTAUTHKEY = req.body.AUTHKEY
    const SERVERAUTHKEY  = process.env.AUTHKEY
    if(!REQUESTAUTHKEY || REQUESTAUTHKEY !== SERVERAUTHKEY){
        console.log('External Request Detected')
        return res.status(401).send('Invalid Request Detected')
    }
    if(REQUESTAUTHKEY === SERVERAUTHKEY){
        return next()
    }
    return next(new Error('An error occurred'))
}

module.exports = {verifyRequest}