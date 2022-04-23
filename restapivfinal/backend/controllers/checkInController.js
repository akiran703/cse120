const { json } = require('body-parser')
const asyncHandler = require('express-async-handler')

const CheckIn = require("../model/checkInModel");

const getDriver =   asyncHandler (async (req,res) => {
 
    const drivers = await CheckIn.find({ user: req.user.id })


    res.status(200).json(drivers)

})

const setDriver =   asyncHandler(async (req,res) => {
 
    if(!req.body)
    {
        res.status(400)
        throw new Error('please add driver')
    }
    console.log(req.body.fullName)
    const drivers  = await CheckIn.create({
        
            fullName: req.body.fullName,
            licenseNo: req.body.licenseNo,
            phoneNo: req.body.phoneNo,
            plateNo: req.body.plateNo,
            apptNo: req.body.apptNo,
            startLoc: req.body.startLoc,
            typeOfTruck: req.body.typeOfTruck
        ,user:req.user._id})
   
    res.status(200).json(drivers)

})

const updateDriver =  asyncHandler(async (req,res) => {
    const drivers = await CheckIn.findById(req.params.id)
    if(!drivers)
    {
        throw new Error('info not found')
    }

    const updatedDriver = await CheckIn.findByIdAndUpdate(req.params.id,req.body, {
        new: true,
       })
  
    res.status(200).json(updatedDriver)
})

const deleteDriver = asyncHandler (async(req,res) => {
    const drivers = await CheckIn.findById(req.params.id)
    if(!drivers)
    {
        throw new Error('info not found')
    }
    await drivers.remove()
    res.status(200).json({message: `delete Info ${req.params.id}`})
})

module.exports = {
    getDriver,setDriver ,updateDriver,deleteDriver
}