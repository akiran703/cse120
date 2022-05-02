const { json } = require('body-parser')
const asyncHandler = require('express-async-handler')

const Location = require('../model/infoModel')




//@desc get goals
//@route get /api/goals
// @access Private
const getInfo =   asyncHandler (async (req,res) => {
 
    const locations = await Location.find({ user: req.user.id })


    res.status(200).json(locations)

})


//@desc set goals
//@route post /api/info
// @access Private
const setInfo =   asyncHandler(async (req,res) => {
 
    if(!req.body)
    {
        res.status(400)
        throw new Error('please add coordinates')
    }
    console.log(req.body.geoObj.lat)
    const locations  = await Location.create({geoObj:{isError:req.body.geoObj.isError,lat:req.body.geoObj.lat,lng:req.body.geoObj.lng,message:req.body.geoObj.message},user:req.user._id})
    console.log(locations)
    res.status(200).json(locations)

})

//@desc update goals
//@route put /api/goals/id
// @access Private
const updateInfo =  asyncHandler(async (req,res) => {
    const locations = await Location.findById(req.params.id)
    if(!locations)
    {
        throw new Error('info not found')
    }

    const updatedInfo = await Location.findByIdAndUpdate(req.params.id,req.body, {
        new: true,
       })
  
    res.status(200).json(updatedInfo)
})


//@desc delete goals
//@route delete /api/goals/id
// @access Private
const deleteInfo = asyncHandler (async(req,res) => {
    const locations = await Location.findById(req.params.id)
    await locations.remove()
    res.status(200).json({ id: req.params.id })


})

module.exports = {
    getInfo,setInfo ,updateInfo,deleteInfo,
}