const user = require('../models/User');
const bcrypt = require('bcryptjs');
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

exports.PostSignUp = (req, res, next) => {
    const email = req.body.email;
    const pasword = req.body.pasword;
    const confirmPassword = req.body.confirmPassword;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Date = req.body.Date;
    const Gender = req.body.Gender;
    const UserName = username(FirstName, LastName);
    const status = 'pinding';
    user.findOne({email : email})
    .then(result => {
        if(!result){
            if (pasword === confirmPassword) {
                const HashPassword = bcrypt.hashSync(pasword, 16);
                console.log(HashPassword);

                transport.sendMail({
                    from: "teste.learningnodejs@gmail.com",
                    to: email,
                    subject: "Testing",
                    text: "first email send from Node Js from NodeMail"
                  }).then(result => {
                    console.log(result);
                  }).catch(err => {
                      console.log(err);
                  })
                // new user({
                //     email : email,
                //     password: pasword,
                //     Name: Name,
                //     DataBorn : Date,
                //     Gender :Gender        
                // })
            }
        }else {
            const error = new Error('this Email Already Register');
            error.StatusCode = 422;
            throw error;
        }
    }).catch(err => {
          return next(err);
    });    
    res.end();
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