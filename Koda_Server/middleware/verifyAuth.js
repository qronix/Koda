const ApplicationError = require('../_helpers/applicationError')
const network = require('../apis/network')

const verifyAuth = async function (req, res, next) {
  console.dir(req.headers)
  try {
    const response = await network.post('/checkauth', {
      data: {
        user: { ...req.user }
      },
      headers: {
        'Authorization': { ...req.headers.Authorization }
      }
    })
    console.log(response.data)
  } catch (err) {
    next(new ApplicationError('Could not auth user'))
  }
  next()
}

module.exports = { verifyAuth }
