const express = require('express')
const router = express.Router()
const {getTime,setTime ,updateTime,deleteTime} = require('../controllers/timeController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect,getTime).post(protect,setTime)
router.route('/:id').put(protect,updateTime).delete(protect,deleteTime)

module.exports = router