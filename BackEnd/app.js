const express = require('express');
const bodyparse = require('body-parser');
const mongoose =  require('mongoose');
const User = require ('./models/User');
const url = 'mongodb://127.0.0.1:27017/E-Learning';
const AuthRoute = require('./Route/Auth');
const ConfirmRoute = require('./Route/Confirm');
const multer =require('multer');
const app = express();

app.use(bodyparse.json());

app.use(multer().array());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/Admin', AuthRoute);
app.use('/Confirm', ConfirmRoute)

mongoose.connect(url)
.then(result => {
    /*
    User.findOne()
    .then(IfOneUser => {
       if(!IfOneUser){
        new User({
            password: 'test',
            email: "test@test.com",
            UserName: 'test',
            Name: 'test',
            Type: 1,        
            DataBorn: new Date('1994-10-01'),
            Gender: 'Male'
        }).save()
        .then(result => {
            //console.log(result);
        }).catch(err => console.log(err));
       }
    }).catch(err => console.log(err));
    /*/
    app.listen(3000);
}).catch(err => console.log(err));

app.use((error, req, res, next) => {
    console.log(error);
    const StatusCode = Number(JSON.stringify(error).slice(14, 17));
    const message = error.toString().split(':')[1].trim();    
    return res.status(StatusCode).json({
        message : error.toString().split(':')[1].trim()
    })
})
