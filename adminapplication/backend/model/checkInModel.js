const mongoose = require('mongoose');

const checkInSchema = mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      
        fullName: {
            type: String
        },
        licenseNo: {
            type: String
        },
        phoneNo: {
            type: String
        },
        plateNo: {
            type: String
        },
        apptNo: {
            type: String
        },
        startLoc: {
            type: String
        },
        typeOfTruck: {
            type: String
        }
    },
{
    timestamps:true  
}
    
)

module.exports = mongoose.model("CheckIn", checkInSchema);