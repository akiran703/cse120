const mongoose = require('mongoose');

const poSchema = mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      
        po1: {
            type: String
        },
        po2: {
            type: String
        },
        po3: {
            type: String
        },
        po4: {
            type: String
        },
        po5: {
            type: String
        },
        po6: {
            type: String
        },
        po7: {
            type: String
        },
        po8: {
            type: String
        }
    },
{
    timestamps:true  
}
    
)

module.exports = mongoose.model("ListOfPO", poSchema);