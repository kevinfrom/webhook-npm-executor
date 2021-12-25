const corsMiddleware = require('cors')

const cors = (req, res, next) => {
    const originIsAllowed = process.env.ALLOWED_ORIGINS.includes(req.get('origin'))

    corsMiddleware({
        origin: originIsAllowed ? req.get('origin') : null
    })
    next()
}

const validateAuthHeader = (req, res, next) => {
    const accessToken = req.headers.access_token

    if (accessToken === undefined) {
        return res.status(400).json({
            status: 'error',
            message: 'Missing access_token header',
            result: null,
        })
    }

    if (accessToken !== process.env.ACCESS_TOKEN) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid access_token',
            result: null
        })
    }

    next()
}

module.exports = {cors, validateAuthHeader}