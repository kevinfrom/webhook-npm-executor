const express = require('express')
const AppsRouter = express.Router()
const {exec} = require('child_process')
const apps = require('../apps.json')

const getAppById = appId => {
    if (apps[appId]) return apps[appId]
    return null
}

const getResult = (successMessage, errorMessage, data) => {
    return {
        statusCode: data ? 200 : 404,
        status: data ? 'ok' : 'error',
        message: data ? successMessage : errorMessage,
        result: data
    }
}

AppsRouter.get('/', (req, res) => {
    return res.json({apps})
})

AppsRouter.get('/:appId', (req, res) => {
    const app = getAppById(req.params.appId)
    const result = getResult('The app was found', 'The app does not exist', app)

    return res.status(result.statusCode).json(result)
})

AppsRouter.post('/:appId/build', (req, res) => {
    const app = getAppById(req.params.appId)
    const cmd = `cd ${app.path} && ${app.build_command}`

    exec(cmd, (err, stdout, stderr) => {
        const error = stderr || err
        const resultIsOk = !stderr && !err
        const result = getResult(stdout, error, resultIsOk ? stdout : null)

        return res.status(result.statusCode).json(result)
    })
})

module.exports = AppsRouter
