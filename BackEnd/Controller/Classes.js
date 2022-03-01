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
        console.log(req.user);
        //console.log(req.userId);
        if (req.user.Type == 1) {
            //console.log(req.body);
            new Classes({
                detials: req.body.Detials,
                Name: req.body.Name,
                Note: req.body.Note,
                Materials: req.body.Material,
            }).save().then(resultSucessful => {
                if (resultSucessful) {
                    transport.sendMail({
                        from: "teste.learningnodejs@gmail.com",
                        to: req.user.email,
                        subject: "Successfull! Added",
                        html: FormateEmails.AddedNewClass(req.user.Name, req.body.Name)
                    }).then(emailSended => {
                        res.state(200).json({
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