const express = require('express')
const router = express.Router()
const {getList, setList,updateList,deleteList} = require('../controllers/listPOController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect,getList).post(protect,setList)
router.route('/:id').delete(protect,deleteList).put(protect,updateList)





module.exports = router
