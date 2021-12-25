const {config} = require('dotenv')
config()

const Api = require('./router')
const PORT = process.env.PORT || 8000

Api.listen(PORT, () => {
    console.log(`Service available at http://localhost:${PORT}/`)
})
