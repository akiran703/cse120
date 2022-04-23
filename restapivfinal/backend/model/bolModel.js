const mongoose = require('mongoose');

const uploadSchema = mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
        image: {
            type: String
        }
    },
{
    timestamps:true  
}
    
)

module.exports = mongoose.model("Upload", uploadSchema);