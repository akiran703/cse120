const { json } = require('body-parser')
const asyncHandler = require('express-async-handler')

const bol = require("../model/bolModel");

const getUpload =   asyncHandler (async (req,res) => {
 
    const lists = await bol.find({ user: req.user.id })


    res.status(200).json(lists)

})

const setUpload =   asyncHandler(async (req,res) => {
 
    if(!req.body)
    {
        res.status(400)
        throw new Error('please add item')
    }
    const uploads  = await bol.create({
            image: req.body.image
        ,user:req.user._id})
   
    res.status(200).json(uploads)

})

const updateUpload =  asyncHandler(async (req,res) => {
    const uploads = await bol.findById(req.params.id)
    if(!uploads)
    {
        throw new Error('info not found')
    }

    const updatedUpload = await bol.findByIdAndUpdate(req.params.id,req.body, {
        new: true,
       })
  
    res.status(200).json(updatedUpload)
})

const deleteUpload = asyncHandler (async(req,res) => {
    const uploads = await bol.findById(req.params.id)
    if(!uploads)
    {
        throw new Error('info not found')
    }
    await uploads.remove()
    res.status(200).json({message: `delete Info ${req.params.id}`})})

module.exports = {
    getUpload,setUpload ,updateUpload,deleteUpload
}