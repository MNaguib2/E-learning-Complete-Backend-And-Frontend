const express = require('express');
const Router = express.Router();
const ConfirmCotroller = require('../Controller/Confirm');

Router.get('/:Token/:email' , ConfirmCotroller.POSTSignUPActivation);

module.exports = Router;