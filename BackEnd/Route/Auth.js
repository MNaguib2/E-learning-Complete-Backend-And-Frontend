const express = require('express');
const router = express.Router();
const multer  = require('multer')
const AuthCotroller = require('../Controller/Auth');

router.post('/SigUp' , multer().any(), AuthCotroller.PostSignUp);
router.get('/RestPassword/:email' , AuthCotroller.GetRestPassword);
router.post('/SignIn' , AuthCotroller.postSigin);
router.post('/Login' , AuthCotroller.PostConfirmPassord);
router.post('/postImage/:id' ,AuthCotroller.UploadImage , AuthCotroller.PostImage)
router.get('/AutoLogin/:Token' , AuthCotroller.AutoLogin)

module.exports = router;