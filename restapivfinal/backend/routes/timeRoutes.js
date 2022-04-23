const express = require('express')
const router = express.Router()
const {getTime,setTime ,updateTime} = require('../controllers/timeController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect,getTime).post(protect,setTime)
router.route('/:id').put(protect,updateTime)

module.exports = router