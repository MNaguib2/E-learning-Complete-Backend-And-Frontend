const express = require('express');
const router = express.Router();
const AuthCotroller = require('../Controller/Auth');

router.post('/SigUp' , AuthCotroller.PostSignUp);
router.get('/RestPassword/:email' , AuthCotroller.GetRestPassword);
router.post('/SignIn' , AuthCotroller.postSigin);
router.post('/Login' , AuthCotroller.PostConfirmPassord);

module.exports = router;