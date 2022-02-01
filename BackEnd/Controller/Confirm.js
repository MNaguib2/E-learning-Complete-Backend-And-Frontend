const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Password = require('../dataShare').passwordconfirm;
const nodemail = require('nodemailer');
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

exports.POSTSignUPActivation = (req, res, next) => {
    const Token = req.params.Token;
    const Email = jwt.verify(req.params.email, Password, (err, decoded) => {
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
                                        html: `
                                        <h1 style="text-align:center; color: #008000">Welcome In E-Learning</h1>
                                        <hr>
                                        <div style="margin-left: 15px;margin-right: 15px; text-align:left;">
                                        <h1 style="font-family:courier; color: #002080">Greetings from the engineer 
                                        <div style="font-family:verdana; margin-left: 28vw">Mena Afefe Fawze</div> </h1>
                                        <br>
                                        <h2 style="color: #000080;">To Do Login You Need To save This UserName </h2> 
                                        <h2 style="color: #000080;">Your UserName : - ${result.UserName}</h2>
                                        <h2 style="color: #000080;">Your ID : - ${result._id}</h2>
                                        <div style="color:#400080; text-align:center;">
                                        <p>If You have any problem You can call me via Phone Or email But Please To Easy Help
                                         You Must Save Your Id and Your User-name to help me can solve any problem for you in easy ThankYou 
                                         and I will Leave All My Content In Below</p>
                                         <h3>Phone :- +201022448327</h3>
                                         <h3>Email :- mena_afefe3000@yahoo.com</h3>
                                        </div>
                                        <h3 style="color:#400080;">best wishes!</h4>
                                        </div>
                                      `
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

    // console.log(Token + ' ' , Email);
    // console.log(new Date(Email.exp));
    // const restTokenExpiration = Date.now() + (3600000 * 3);
    // console.log( new Date(restTokenExpiration));
}