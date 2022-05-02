const asyncHandler = require('express-async-handler')
const { json } = require('body-parser')


const ListPO = require("../model/listPOModel");

const getAllList = asyncHandler (async (req,res) => {
 
    const poValues = await ListPO.find()

    res.status(200).json(poValues)

})



module.exports = {
    getAllList,
}