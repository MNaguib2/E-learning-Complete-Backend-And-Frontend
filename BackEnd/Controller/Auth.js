const user = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemail = require('nodemailer');
const crypto = require('crypto');
const DataShare  = require('../dataShare');
var User;

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

exports.PostSignUp = (req, res, next) => {
    const email = req.body.email;
    const pasword = req.body.pasword;
    const confirmPassword = req.body.confirmPassword;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const date = req.body.Date;
    const Gender = req.body.Gender;
    const UserName = username(FirstName, LastName);
    const status = 'pinding';
    const emailEncryption = jwt.sign({email}, DataShare.passwordconfirm,{expiresIn: DataShare.ExpireInJsonWebToken},{ignoreExpiration: true});
    //console.log(emailEncryption);
    // console.log(jwt.decode(emailEncryption , 'test'));
    user.findOne({ email: email })
        .then(result => {
            if (!result) {
                if (pasword === confirmPassword) {
                    const HashPassword = bcrypt.hashSync(pasword, 14);
                    const Token = crypto.randomBytes(32).toString('hex');
                    const restTokenExpiration = Date.now() + (3600000 * 3);
                    //console.log( new Date(restTokenExpiration));
                    //*
                    User = new user({
                        email: email,
                        password: HashPassword,
                        Name: FirstName + ' ' + LastName,
                        DataBorn: date,
                        Gender: Gender,
                        status: status,
                        UserName: UserName,
                        Type: 3,
                        restTokenExpiration: restTokenExpiration, //60min
                        restToken: Token
                    }).save()
                        .then(saveUser => {
                            if (saveUser) {
                                transport.sendMail({
                                    from: "teste.learningnodejs@gmail.com",
                                    to: email,
                                    subject: "Register Ok!",
                                    html: `
                                    <h1 style="text-align:center;">Hello In Website E-Learning</h1> 
                                    <h1 style="text-align:left;">Welcome<div> I Name Eng: Mena Afefe</div></h1> 
                                    <p style="text-align:left;">Please Click this <strong><a href="http://localhost:4200/confirm/${Token}/${emailEncryption}">link</a></strong> to set a Activation Account.</p>
                                  `
                                }).then(result => {
                                    //console.log(result);
                                    return res.status(200).json({
                                        Message : 'Done! Please Check Your Mail!',
                                        Status : 'Register'
                                    });
                                }).catch(err => {
                                    console.log(err);
                                    const error = new Error('this Is Error Event In Send Mail Please Call Developer Mena Afefe');
                                    error.StatusCode = 501;
                                    return next(error);
                                })
                            }
                        }).catch(err => {
                            //console.log(err);
                            const error = new Error('Please Add Valid Data Add All Requirments');
                            error.StatusCode = 422;
                            return next(error);
                        })
                }
            } else {
                const error = new Error('this Email Already Register');
                error.StatusCode = 422;
                throw error;
            }
        }).catch(err => {
            return next(err);
        });
}

username = (Fname, LName) => {
    let againAnotherID = false;
    let UserName;
    do {
        UserName = Fname.slice(0, 1) + new Date().getSeconds() + LName + Math.floor(Math.random() * 99);
        user.findOne({ UserName: UserName })
            .then(result => {
                if (result) {
                    againAnotherID = true;
                } else {
                    againAnotherID = false;
                }
            }).catch(err => console.log(err));
    } while (againAnotherID)
    return UserName;
}