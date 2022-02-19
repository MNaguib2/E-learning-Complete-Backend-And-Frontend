const mongoose = require('mongoose');
const schema = mongoose.schema;

const MaterialSchema = new schema({
    detials: {
        type: String,
        required: true
    },
    Properites: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Note: String,
    Professor: {
        type: schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps: true
})
module.exports = mongoose.model('Material', MaterialSchema);