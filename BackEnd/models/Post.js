const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PostSchema = new schema({
    detials: {
        type: String,
        required: true
    },
    FileURL: String,
    Name: {
        type: String,
        required: true
    },
    Note: String,
    UserId: {
        type: schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ClassId: {
        type: schema.Types.ObjectId,
        ref: 'Classe',
        required: true
    },
    Edite: [
        {
            Date: Date,
            PreviousEdit: String,
            nextEdit: String,
        }
    ],
    Comment: [
        {
            UserId: {
                type: schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            Comment: {
                type: String,
                required: true
            },
            EditeComment: [
                {
                    Date: Date,
                    PreviousEdit: String,
                    nextEdit: String,
                }
            ]
        }
    ],
    Likes: [
        {
            UserId: {
                type: schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            Reaction: {
                type: String,
                required: true
            },
        }
    ]
},
{
    timestamps: true
})

module.exports = mongoose.model('Post', PostSchema);