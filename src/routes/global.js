const express = require('express')
const router = express.Router()
const globalController = require('./controllers/global')
// your routes paths and methods
// single basic route at the base path of your application
router.get('/', globalController.healthyCheck) // we've changed this
module.exports = router


