const User = require('../models/User');
const jwt = require('jsonwebtoken');
const DataShare = require('../dataShare');
const nodemail = require('nodemailer');
const crypto = require('crypto');
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

exports.GETSignUPActivation = (req, res, next) => {
    const Token = req.params.Token;
    const Email = jwt.verify(req.params.email, DataShare.passwordconfirm, (err, decoded) => {
        if (!err) {
            //console.log(decoded);
            //console.log(new Date(decoded.exp));
            if (Date.now() > decoded.exp) {
                const error = new Error('PLease Use RestPassword To get Another URL Activation');
                error.StatusCode = 408;
                return next(error);
            } else {
                return decoded;
            }
        } else {
            const error = new Error('This is URL InValid');
            error.StatusCode = 404;
            return next(error);
        }
    });
    User.findOne({ email: Email.email })
        .then(result => {
            if (result) {
                if (Date.now() > result.restTokenExpiration) {
                    const error = new Error('PLease Use RestPassword To get Another URL Activation');
                    error.StatusCode = 408;
                    return next(error);
                } else {
                    if (Token === result.restToken) {
                        result.status = 'work';
                        result.restToken = '';
                        result.restTokenExpiration = null;
                        result.save()
                            .then(SaveDone => {
                                if (SaveDone) {
                                    transport.sendMail({
                                        from: "teste.learningnodejs@gmail.com",
                                        to: result.email,
                                        subject: "Activation Successfully !",
                                        html: FormateEmails.ActivationFormatEmail(result.UserName, result._id)
                                    }).then(result => {
                                        //console.log(result);
                                        return res.status(200).json({
                                            Message: 'Welcome! Your Account is Activated Please Check Your UserName In Email To Login!',
                                            Status: 'Activation Done!'
                                        });
                                    })
                                } else {
                                    const error = new Error('occurred error! number 2 Please send to Developer mena_afefe3000@yahoo.com');
                                    error.StatusCode = 409;
                                    return next(error);
                                }
                            })
                    } else {
                        const error = new Error('occurred error! number 3 Please send to Developer mena_afefe3000@yahoo.com');
                        error.StatusCode = 406;
                        return next(error);
                    }
                }
            } else {
                const error = new Error('This error Number 1 Please send to Developer mena_afefe3000@yahoo.com');
                error.StatusCode = 404;
                return next(error);
            }
        }).catch(err => {
            const error = new Error('This URL Is InValid');
            error.StatusCode = 404;
            return next(error);
        })
}

exports.GetRestPassword = (req, res, next) => {
    const email = req.params.email;
    User.findOne({ email: email })
        .then(result => {
            if (result && result.status === 'work' || 'pinding') {
                const Token = crypto.randomBytes(32).toString('hex');
                const TokenEncryption = jwt.sign({ Token }, result.UserName, { expiresIn: DataShare.ExpireInJsonWebToken });
                result.restTokenExpiration = Date.now() + (3600000 * 3);
                result.restToken = TokenEncryption;
                result.status = 'pinding';
                result.save()
                    .then(SaveDone => {
                        if (SaveDone) {
                            transport.sendMail({
                                from: "teste.learningnodejs@gmail.com",
                                to: result.email,
                                subject: "Rest Password!",
                                html: FormateEmails.RestPasswordFormatEmail(`http://localhost:4200/rest/${TokenEncryption}`)
                            })
                                .then(result => {
                                    //console.log(result);
                                    if (result) {
                                        return res.status(200).json({
                                            Message: 'Done! Please Check Your Email To get Link Rest!',
                                            Status: 'Rest Request!'
                                        });
                                    }
                                }).catch(err => {
                                    //console.log(err);
                                    const error = new Error('this Is Error Event In Send Mail Please Call Developer Mena Afefe');
                                    error.StatusCode = 501;
                                    return next(error);
                                })
                        }
                    })
                    .catch(err => {
                        const error = new Error('This error Number 6 Please send to Developer mena_afefe3000@yahoo.com');
                        error.StatusCode = 404;
                        return next(error);
                    });
            } else {
                const error = new Error('This error Number 5 Please send to Developer mena_afefe3000@yahoo.com');
                error.StatusCode = 404;
                return next(error);
            }
        }).catch(err => {
            console.log(err);
            const error = new Error('occurred error! number 4 Please send to Developer mena_afefe3000@yahoo.com');
            error.StatusCode = 400;
            return next(error);
        })
    // setTimeout(() => {
    //     res.end();
    // }, 10000);    
}