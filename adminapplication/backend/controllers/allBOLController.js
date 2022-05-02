const asyncHandler = require('express-async-handler')
const { json } = require('body-parser')


const bol = require("../model/bolModel");

const getAllUpload = asyncHandler (async (req,res) => {
 
    const bolValues = await bol.find()

    res.status(200).json(bolValues)

})



module.exports = {
    getAllUpload,
}