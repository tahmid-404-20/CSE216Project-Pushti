const express = require('express')
const router = express.Router()
const loginController = require('../controller/loginController')

router.use('/', loginController);

module.exports = router;