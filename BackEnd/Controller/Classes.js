const Classes = require('../models/Classes');
const user = require('../models/User');
const { validationResult } = require('express-validator');
const nodemail = require('nodemailer');
const FormateEmails = require('../Emails Format/ConfirmEmails');
const DataShare = require('../dataShare');
const transport = nodemail.createTransport(DataShare.DataEmail)
exports.NewClasses = (req, res, next) => {
    const errorMessage = validationResult(req).errors > 0 ? validationResult(req).errors[0].msg : null;
    if (!errorMessage) {
        //console.log(req.user);
        //console.log(req.userId);
        if (req.user.Type == 1) {
            //console.log(req.body.Class);
            new Classes({
                detials: req.body.Class.Detials,
                Name: req.body.Class.Name,
                Note: req.body.Class.Note,
                Materials: req.body.Class.Material,
            }).save().then(resultSucessful => {
                //console.log(resultSucessful);
                if (resultSucessful) {
                    transport.sendMail({
                        from: "teste.learningnodejs@gmail.com",
                        to: req.user.email,
                        subject: "Successfull! Added",
                        html: FormateEmails.AddedNewClass(req.user.Name, req.body.Class.Name)
                    }).then(emailSended => {
                        res.status(200).json({
                            message : 'Your Class Is Add Sucessful!!',
                            NewClass : {Detials : resultSucessful.Detials , Material : resultSucessful.Materials,
                                Name : resultSucessful.Name, Note: resultSucessful.Note , _id: resultSucessful._id}
                        })
                    })
                        .catch(err => {
                            const error = new Error('this Is Error Event In Send Mail Please Call Developer Mena Afefe \n Class Added');
                            error.StatusCode = 501;
                            return next(error);
                        });
                } else {
                    const error = new Error('occurred error! number 20 Please send to Developer mena_afefe3000@yahoo.com');
                    error.StatusCode = 401;
                    //throw error //this is wrong to can't add throw in catch
                    return next(error);
                }
            }).catch(err => {
                const error = new Error('occurred error! number 20 Please send to Developer mena_afefe3000@yahoo.com');
                error.StatusCode = 401;
                //throw error //this is wrong to can't add throw in catch already TRy this
                return next(error);
            });
        } else {
            const error = new Error('occurred error! number 19 please send to Developer mena_afefe3000@yahoo.com');
            error.StatusCode = 401;
            throw error;
        }
    } else {
        const error = new Error(`occurred error! ${errorMessage}`);
        error.StatusCode = 406;
        throw error;
    }
    setTimeout(() => {
        res.end();
    }, 10000);
}



exports.AddMaterial = (req, res , next) => {
    console.log('test From Add MAterial');
    
    setTimeout(() => {
        res.end();
     }, 5000);
}