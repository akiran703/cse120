const express = require('express')
const router = express.Router()
const {getAllUpload} = require('../controllers/allBOLController')

router.route('/').get(getAllUpload)

module.exports = router