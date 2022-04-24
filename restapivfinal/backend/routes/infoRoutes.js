const express = require('express')
const router = express.Router()
const {getInfo, setInfo,updateInfo,deleteInfo} = require('../controllers/infoController')

const {protect} = require('../middleware/authMiddleware')


router.route('/').get(protect,getInfo).post(protect,setInfo)
router.route('/:id').delete(protect,deleteInfo).put(protect,updateInfo)





module.exports = router

