const express = require('express')
const router = express.Router()
const {getAllTime} = require('../controllers/alltimeController')

router.route('/').get(getAllTime)

module.exports = router