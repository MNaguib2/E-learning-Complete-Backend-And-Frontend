const express = require('express');
const router = express.Router();
const AuthCotroller = require('../Controller/Auth');

router.post('/SigUp' , AuthCotroller.PostSignUp);

module.exports = router;