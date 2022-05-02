const asyncHandler = require('express-async-handler')
const { json } = require('body-parser')


const Time = require('../model/timeModel')

const getAllTime = asyncHandler (async (req,res) => {
 
    const timevalues = await Time.find()

    res.status(200).json(timevalues)

})



module.exports = {
    getAllTime,
}