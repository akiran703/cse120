const { json } = require('body-parser')
const asyncHandler = require('express-async-handler')

const ListPO = require("../model/listPOModel");

const getList =   asyncHandler (async (req,res) => {
 
    const lists = await ListPO.find({ user: req.user.id })


    res.status(200).json(lists)

})

const setList =   asyncHandler(async (req,res) => {
 
    if(!req.body)
    {
        res.status(400)
        throw new Error('please add item')
    }
    console.log(req.body.po1)
    const lists  = await ListPO.create({
        
            po1: req.body.po1,
            po2: req.body.po2,
            po3: req.body.po3,
            po4: req.body.po4,
            po5: req.body.po5,
            po6: req.body.po6,
            po7: req.body.po7,
            po8: req.body.po8
        ,user:req.user._id})
   
    res.status(200).json(lists)

})

const updateList =  asyncHandler(async (req,res) => {
    const lists = await ListPO.findById(req.params.id)
    if(!lists)
    {
        throw new Error('info not found')
    }

    const updatedList = await ListPO.findByIdAndUpdate(req.params.id,req.body, {
        new: true,
       })
  
    res.status(200).json(updatedList)
})

const deleteList = asyncHandler (async(req,res) => {
    const lists = await ListPO.findById(req.params.id)
    if(!lists)
    {
        throw new Error('info not found')
    }
    await lists.remove()})

module.exports = {
    getList,setList ,updateList,deleteList
}