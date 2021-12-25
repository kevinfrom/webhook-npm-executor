const express = require('express')
const Api = express()
const {cors, validateAuthHeader} = require('./middleware')

Api.use(cors)
Api.use(validateAuthHeader)

const AppsRouter = require('./apps')

Api.use('/apps', AppsRouter)

module.exports = Api
