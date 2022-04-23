const asyncHandler = require('express-async-handler')
const { json } = require('body-parser')





const Time = require('../model/timeModel')

//@desc get time values
//@route get /api/time
// @access Private
const getTime = asyncHandler (async (req,res) => {
 
    const timevalues = await Time.find({user:req.user.id})


    res.status(200).json(timevalues)

})


//@desc set time values
//@route post /api/time
// @access Private
const setTime =   asyncHandler(async (req,res) => {
 
    if(!req.body)
    {
        res.status(400)
        throw new Error('please add coordinates')
    }
    console.log(req.body.temp1.text)
    const timev  = await Time.create({temp1:{text:req.body.temp1.text,value:req.body.temp1.value},user:req.user._id})
   
    res.status(200).json(timev)

})


const updateTime =  asyncHandler(async (req,res) => {
    const timv = await Time.findById(req.params.id)
    if(!timv)
    {
        throw new Error('info not found')
    }

    const updatetime = await Time.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true,
        context: 'query'
       })

    res.status(200).json(updatetime)
})



module.exports = {
    getTime,setTime ,updateTime,
}