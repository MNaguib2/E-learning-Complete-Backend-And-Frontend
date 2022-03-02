const jwt = require('jsonwebtoken');
const DataShare = require('../dataShare.js');
const User = require('../models/User');

exports.AuthAdmin = (req, res, next) => {
    const token = req.get('Token');
    jwt.verify(token, DataShare.passwordconfirm, (error, decoded) => {
        if (!error && decoded) {
            User.findById(decoded.id)
                .then(result => {                    
                    if (result.restToken === decoded.TokenEncryption && Date.now() < result.restTokenExpiration) {
                        req.userId = decoded.id;
                        req.user = result;                        
                        return next();
                    } else {
                        const error = new Error('Your Session Is UnAuthenticted Please Try Login Again');
                        error.StatusCode = 401;
                        throw error;
                    }
                }).catch(error => {
                    return next(error);
                })
        } else {
            const error = new Error('Your Session Is UnAuthenticted Please Try Login Again');
            error.StatusCode = 401;
            throw error; // this comment to throw made error but code catch error to handle in above but after practic throw can handle error
            //return next(error);
        }
    })
}