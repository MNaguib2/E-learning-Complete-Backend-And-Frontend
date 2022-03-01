const express = require('express');
const Router = express.Router();
const ClassesController = require('../Controller/Classes');
const MiddleWare =require('../middleware/Auth');
const { body } = require('express-validator');

Router.post('/newClass', [body('Name', 'Please Entre valid Name').trim().isLength({min: 4}).isString(),
body('Detials').trim().isLength({min: 10}).withMessage('Please Entre More Detials about this class').isString()
.withMessage('Please Entre Valid Detials')
]
, ClassesController.NewClasses);

module.exports = Router;