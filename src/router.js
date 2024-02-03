const express = require('express')
const router = express.Router()
// your routes paths and methods
// single basic route at the base path of your application
router.get('/', (req, res) => { res.send('API online') })
module.exports = router