const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Password = require('../dataShare').passwordconfirm;

exports.POSTSignUPActivation = (req, res, next) => {
    const Token = req.params.Token;
    const Email = jwt.verify(req.params.email, Password);
    User.findOne({email: Email.email})
    .then(result => {

    }).catch(err => {
        const error = new Error('This URL Is InValid');
        error.StatusCode = 404;
        return next(error);
    })
    
    // console.log(Token + ' ' , Email);
    // console.log(new Date(Email.exp));
    // const restTokenExpiration = Date.now() + (3600000 * 3);
    // console.log( new Date(restTokenExpiration));
    res.end();
}