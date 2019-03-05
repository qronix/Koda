const ApplicationError = require('../_helpers/applicationError')
const { network } = require('../apis/network')
const AUTHKEY = process.env.AUTHKEY

const verifyAuth = async function (req, res, next) {
  try {
    const response = await network.post('/checkauth', { AUTHKEY }, { headers: { 'Authorization': req.headers.authorization } })
    console.log(response.data.status)
    if (response.data.status === 200) {
      return next()
    } else {
      res.status(401).json({
        error: 'Could not authorize'
      })
    }
  } catch (err) {
    console.log(err)
    res.status(422).json({
      error: 'An network error occurred'
    })
  }
}

module.exports = { verifyAuth }
