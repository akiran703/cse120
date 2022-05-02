const mongoose = require('mongoose')
const timeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    temp1:{
      text: {
        type: String
      },
      value: {
        type: Number
      }
    }  
  }
  ,
{
    timestamps:true  
}
)

module.exports = mongoose.model('Timeinfo',timeSchema)