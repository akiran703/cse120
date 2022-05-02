const asyncHandler = require('express-async-handler')
const { json } = require('body-parser')


const CheckIn = require("../model/checkInModel");

const getAllDriver = asyncHandler (async (req,res) => {
 
    const checkinvalues = await CheckIn.find()

    res.status(200).json(checkinvalues)

})
module.exports = {
    getAllDriver,
}