const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ClassSchema = new schema({
    detials: {
        type: String,
        required: true
    },
    // Schedual: {
    //     type: String,
    //     required: true
    // },
    Name: {
        type: String,
        required: true,
        unique: true
    },
    Note: String,
    Materials: [
        {
            type: schema.Types.ObjectId,
            ref: 'Material'
        }
    ]
},
    {
        timestamps: true
    });
module.exports = mongoose.model('Classe', ClassSchema);