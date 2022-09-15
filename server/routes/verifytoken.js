const jwt = require('jsonwebtoken')
const { TOKEN_SECRET_KEY } = require('../config')

module.exports = function (req, res, next) {
    const token = req.header('x-access-token')
    if (!token) return res.json({ AccessFail: 'Access Denied' })

    try {
        const verified = jwt.verify(token, TOKEN_SECRET_KEY)
        req.user = verified
        res.json({ validated: 'validated Token' })
        next()
    } catch (err) {

        res.json({ invalid: 'Invalid Token' })
    }
}