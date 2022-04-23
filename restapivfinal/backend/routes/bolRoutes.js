const express = require('express')
const router = express.Router()
const {getUpload, setUpload,updateUpload,deleteUpload} = require('../controllers/bolController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect,getUpload).post(protect,setUpload)
router.route('/:id').delete(protect,deleteUpload).put(protect,updateUpload)





module.exports = router
