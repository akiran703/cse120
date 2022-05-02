const express = require('express')
const router = express.Router()
const {getAllDriver} = require('../controllers/alldriverController')

router.route('/').get(getAllDriver)

module.exports = router