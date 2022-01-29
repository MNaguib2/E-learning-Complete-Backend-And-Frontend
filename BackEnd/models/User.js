const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    restToken: String,
    restTokenExpiration: Date,
    UserName: {
        type: String,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true
    },
    Type: {
        type: Number, //1=Admin 2=Proffessor 3=Student
        required: true
    },
    detials: String,
    resultMaterial: [
        {
            id: schema.Types.ObjectId,
            Result: String
        }
    ],
    DataBorn: {
        type: Date,
        required: true
    },
    ClassId: [
        {
            type: {
                type: schema.Types.ObjectId,
                ref: 'Classe',
                required: true
            },
            Materil: {
                type: schema.Types.ObjectId,
                ref: 'Material',
                required: true
            }
        }
    ],
    Mail: [
        {
            from: {
                type: schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            To: {
                type: schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            BCC: [
                {
                    type: schema.Types.ObjectId,
                    ref: 'User',
                }                
            ],
            Content : String
        }
    ],
    ProfileUrl: String,
    Gender: {
       type: String,
       required: true
    },
    status: {
        type: String,//pinding or work or lock
        require: true
    }
},
{
    timestamps: true
});
module.exports = mongoose.model('User', UserSchema);