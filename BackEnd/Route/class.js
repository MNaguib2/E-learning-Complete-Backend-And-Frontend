const express = require('express');
const Router = express.Router();
const ClasseController = require('../Controller/class');


Router.get('/GetAllClasses' , ClasseController.GetAllClass);
Router.get('/GetAllProffessor' , ClasseController.GetAllProffessor);
Router.get('/GetAllMaterial' , ClasseController.GETAllMaterial);

module.exports = Router;