const Classes = require('../models/Classes');
const { validationResult } = require('express-validator');
const nodemail = require('nodemailer');
const FormateEmails = require('../Emails Format/ConfirmEmails');
const transport = nodemail.createTransport({
    service: "gmail",
    auth: {
        user: "teste.learningnodejs@gmail.com",
        pass: "a12345678A"
    },
    tls: {
        rejectUnauthorized: false
    }
})
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
                //console.log('req.body.Detials');
                if (resultSucessful) {
                    transport.sendMail({
                        from: "teste.learningnodejs@gmail.com",
                        to: req.user.email,
                        subject: "Successfull! Added",
                        html: FormateEmails.AddedNewClass(req.user.Name, req.body.Class.Name)
                    }).then(emailSended => {
                        res.status(200).json({
                            message : 'Your Class Is Add Sucessful!!'
                        })
                    })
                        .catch(err => {
                            const error = new Error('this Is Error Event In Send Mail Please Call Developer Mena Afefe');
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
                //throw error //this is wrong to can't add throw in catch
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

exports.GetAllClass = (req, res, next) => {
        if(req.user.Type == 1){
            Classes.find()
            .then(result => {
                //console.log('test connection');
                // res.status(200).json({
                //     result
                // })
                const error = new Error('occurred error! number 21 please send to Developer mena_afefe3000@yahoo.com');
                error.StatusCode = 400;
                throw error;
            }).catch(err =>{
                const error = new Error('occurred error! number 21 please send to Developer mena_afefe3000@yahoo.com');
                error.StatusCode = 400;
                return next(error);
            })
        }
     setTimeout(() => {
        res.end();
     }, 5000);
}