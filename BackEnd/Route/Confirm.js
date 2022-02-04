const express = require('express');
const Router = express.Router();
const ConfirmCotroller = require('../Controller/Confirm');

Router.get('/RestPassword/:email' , ConfirmCotroller.GetRestPassword);
Router.post('/ActiveNewPassword/:Token' , ConfirmCotroller.PostNewPassword);
Router.get('/:Token/:email' , ConfirmCotroller.GETSignUPActivation);

module.exports = Router;