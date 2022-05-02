const express = require('express')
const router = express.Router()
const {getDriver, setDriver,updateDriver,deleteDriver} = require('../controllers/checkInController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect,getDriver).post(protect,setDriver)
router.route('/:id').delete(protect,deleteDriver).put(protect,updateDriver)





module.exports = router
