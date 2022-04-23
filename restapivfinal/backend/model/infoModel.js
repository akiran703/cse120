const mongoose = require('mongoose')
const locationSchema  = mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
        geoObj: {
          isError: {
            type: Boolean
          },
          lat: {
            type: Number
          },
          lng: {
            type: Number
          },
          message: {
            type: String
          }
        }
      },
{
    timestamps:true  
}
)

module.exports = mongoose.model('Location',locationSchema)