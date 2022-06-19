const Classes = require('../models/Classes');
const user = require('../models/User');
exports.GetAllClass = (req, res, next) => {
    if (req.user.Type == 1) {
        Classes.find()
            .then(result => {
                res.status(200).json({
                    result
                })
                // const error = new Error('occurred error! number 21 please send to Developer mena_afefe3000@yahoo.com');
                // error.StatusCode = 400;
                // throw error;
            }).catch(err => {
                const error = new Error('occurred error! number 21 please send to Developer mena_afefe3000@yahoo.com');
                error.StatusCode = 400;
                return next(error);
            })
    } else {
        const error = new Error('Sorry this is Not admin');
        error.StatusCode = 400;
        return next(error);
    }
}

exports.GetAllProffessor = (req, res, next) => {
    let UserProffessor = [];
    if (req.user.Type == 1) {
        user.find({ Type: 2 }).then(resUser => {
            if (resUser.length > 0) {
                resUser.forEach(value => {
                    UserProffessor.push({
                        Name: value.Name, DataBorn: value.DataBorn,
                        UserName: value.UserName, email: value.email, _id: value._id, detials: value.detials
                    })
                })
                return res.status(200).json(UserProffessor);
            } else {
                const error = new Error('occurred error! Please Add Professor From Setting');
                error.StatusCode = 404;
                throw error;
            }
        }).catch(err => {
            return next(err);
        })
    }
    else {
        const error = new Error('Sorry this is Not admin');
        error.StatusCode = 400;
        return next(error);
    }
    setTimeout(() => {
        res.end();
    }, 5000);
}

exports.GETAllMaterial = (req, res, next) => {
    console.log('test Freom Get All MAterial');

    setTimeout(() => {
        res.end();
    }, 5000);
}