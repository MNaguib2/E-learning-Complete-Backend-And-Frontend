const mongoose = require('mongoose');
const schema = mongoose.Schema;

const VideosSchema = new schema({
    detials : {
        type: String,
        required: true
    },
    VideoURL: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Note: String,
    IdMaterial: {
        type: schema.Types.ObjectId,
        ref: 'Material',
        required: true
    }
},
{
    timestamps: true
} 
)

module.exports = mongoose.model('Video', VideosSchema);