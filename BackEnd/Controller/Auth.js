const user = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemail = require('nodemailer');
const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const DataShare = require('../dataShare');
const FormateEmails = require('../Emails Format/ConfirmEmails');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
var User;

const ImageFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

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

var UserName;

exports.PostSignUp = (req, res, next) => {
    const email = (req.body.email).toLowerCase();
    const pasword = req.body.pasword;
    const confirmPassword = req.body.confirmPassword;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const date = req.body.Date;
    const Gender = req.body.Gender;
    UserName = username(FirstName, LastName);
    const status = 'pinding';
    const emailEncryption = jwt.sign({ email }, DataShare.passwordconfirm, { expiresIn: DataShare.ExpireInJsonWebToken }, { ignoreExpiration: true });
    //console.log(emailEncryption);
    // console.log(jwt.decode(emailEncryption , 'test'));
    user.findOne({ email: email })
        .then(result => {
            //console.log(result);
            if (!result) {
                if (pasword === confirmPassword) {
                    const HashPassword = bcrypt.hashSync(pasword, 14);
                    const Token = crypto.randomBytes(32).toString('hex');
                    const restTokenExpiration = Date.now() + (3600000 * 3);
                    //console.log(new Date(restTokenExpiration));
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
                                    <p style="text-align:left;">Please Click this <strong><a href="http://${DataShare.HostServer}:4200/confirm/${Token}/${emailEncryption}">link</a></strong> to set a Activation Account.</p>
                                  `
                                }).then(result => {
                                    //console.log(result);
                                    return res.status(200).json({
                                        Message: 'Done! Please Check Your Mail!',
                                        Status: 'Register',
                                        Id: saveUser._id
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
                } else {
                    const error = new Error('this Password Is not equal confirmPassword');
                    error.StatusCode = 501;
                    throw error;
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

exports.GetRestPassword = (req, res, next) => {
    const email = req.params.email;
    user.findOne({ email: email })
        .then(result => {
            //console.log(result);
            if (result && (result.status === 'work' || result.status === 'pinding')) {
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
                                html: FormateEmails.RestPasswordFormatEmail(`http://${DataShare.HostServer}:4200/rest/${TokenEncryption}`)
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
            //console.log(err);
            const error = new Error('occurred error! number 4 Please send to Developer mena_afefe3000@yahoo.com');
            error.StatusCode = 400;
            return next(error);
        })
}
exports.postSigin = (req, res, next) => {
    user.findOne({ UserName: req.body.username })
        .then(result => {
            if (result && result.status === "work") {
                const signature = crypto.randomBytes(16).toString('hex');
                result.restToken = signature;
                result.restTokenExpiration = Date.now() + 300000;
                result.save()
                    .then(result => {
                        return res.json({ signature });
                    }).catch(err => {
                        const error = new Error('This error Number 16 Please send to Developer mena_afefe3000@yahoo.com');
                        error.StatusCode = 404;
                        return next(error);
                    })
            } else {
                const error = new Error('This error Number 12 Please send to Developer mena_afefe3000@yahoo.com');
                error.StatusCode = 404;
                return next(error);
            }
        }).catch(err => {
            const error = new Error('occurred error! number 11 Please send to Developer mena_afefe3000@yahoo.com');
            error.StatusCode = 400;
            return next(error);
        })
}
exports.PostConfirmPassord = (req, res, next) => {
    user.findOne({ UserName: req.body.username })
        .then(result => {
            if (result && result.restTokenExpiration > Date.now()) {
                const Password = CryptoJS.AES.decrypt(req.body.password, result.restToken).toString(CryptoJS.enc.Utf8);
                if (bcrypt.compareSync(Password, result.password)) {
                    result.restToken = '';
                    result.restTokenExpiration = null;
                    result.save()
                        .then(saveLog => {
                            const Token = jwt.sign({ id: result._id.toString() }, DataShare.passwordconfirm, { expiresIn: DataShare.ExpireInJsonWebTokenForoneHoure });
                            res.status(202).json({
                                Message: `HellO ${result.Name}`,
                                Token: Token,
                                UserData:
                                    { name: result.Name, id: result._id, type: result.Type, Gender: result.Gender, DataBorn: result.DataBorn, email: result.email }
                            })
                        }).catch(err => {
                            const error = new Error('occurred error! number 13 Please send to Developer mena_afefe3000@yahoo.com');
                            error.StatusCode = 400;
                            return next(error);
                        })
                } else {
                    const error = new Error('occurred error! number 17 Please send to Developer mena_afefe3000@yahoo.com');
                    error.StatusCode = 400;
                    return next(error);
                }
            } else {
                const error = new Error('occurred error! number 14 Please send to Developer mena_afefe3000@yahoo.com');
                error.StatusCode = 400;
                return next(error);
            }
        }).catch(err => {
            const error = new Error('occurred error! number 13 Please send to Developer mena_afefe3000@yahoo.com');
            error.StatusCode = 400;
            return next(error);
        })
    signature = '';
}

// const filePath = path.join(__dirname,'../Data','1291250','Images')
// console.log(filePath);
// if (!fs.existsSync(filePath)){
//     fs.mkdirSync(filePath);
// }


exports.UploadImage = multer({
    fileFilter: ImageFilter, storage: multer.diskStorage({
        destination: (req, file, cb) => {
            user.findById(req.params.id)
                .then(result => {
                    if (result) {
                        const filePath = path.join(__dirname, '../Data', result.UserName);
                        if (!fs.existsSync(filePath)) {
                            fs.mkdirSync(filePath);
                        }
                        cb(null, `Data/${result.UserName}`)
                    } else {
                        const error = new Error('occurred error! number 15 Please send to Developer mena_afefe3000@yahoo.com');
                        error.StatusCode = 404;
                        throw error
                    }
                }).catch(errr => {
                    return next(errr);
                })//"http://localhost:3000/" + req.file.path
        },
        filename: (req, file, cb) => {
            //console.log(file);
            cb(null, new Date().toISOString().replace(/:/g, '') + '-' + file.originalname.replace(/ /g, ''));
        }
    })
}).single('ImageProfile');//.any();
exports.PostImage = (req, res, next) => {
    //console.log(req.file);
    user.findById(req.params.id)
        .then(result => {
            if (result) {
                result.ProfileUrl = `http://${DataShare.HostServer}:3000/` + `${result.UserName}/` + req.file.filename;
                result.save();
            } else {
                const error = new Error('occurred error! number 15 Please send to Developer mena_afefe3000@yahoo.com');
                error.StatusCode = 404;
                throw error
            }
        }).catch(errr => {
            return next(errr);
        })
    // console.log('test from PostImage');
    // setTimeout(() => {
    res.end();
    // }, 100000);
}


exports.AutoLogin = (req, res, next) => {
    const Token = req.params.Token;
    const ID = jwt.verify(Token, DataShare.passwordconfirm, (error, decoded) => {
        if (decoded.exp > Date.now() && !error) {
            user.findById(decoded.id)
                .then(result => {
                    if (result) {
                        res.status(200).json({
                            UserData:
                                { name: result.Name, id: result._id, type: result.Type, Gender: result.Gender, DataBorn: result.DataBorn, email: result.email }
                        })
                    } else {
                        const error = new Error('Your Fack Session Please Try Again Login');
                        error.StatusCode = 403;
                        throw error;
                    }
                }).catch(err => {
                    return next(err);
                })
        } else {
            const error = new Error('Your Session Is expire Please Return Login');
            error.StatusCode = 504;
            return next(error)
        }
    })
    setTimeout(() => {
        res.end();
    }, 100000);
}