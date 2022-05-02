const express = require('express')
const router = express.Router()
const {getAllList} = require('../controllers/allPOController')

router.route('/').get(getAllList)

module.exports = router