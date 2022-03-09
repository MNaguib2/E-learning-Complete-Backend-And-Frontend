const express = require('express');
const cors = require('cors');
const bodyparse = require('body-parser');
const mongoose =  require('mongoose');
const User = require ('./models/User');
const url = 'mongodb://127.0.0.1:27017/E-Learning';
const AuthRoute = require('./Route/Auth');
const ConfirmRoute = require('./Route/Confirm');
const ClassesRoute = require('./Route/Classes');
const path = require('path');
const MiddleWare =require('./middleware/Auth');
const app = express();

app.use(bodyparse.json());

// app.use(multer().any());

app.use('',express.static(path.join(__dirname, 'Data')));
//app.use('Data',express.static(path.join(__dirname, 'Data')));

app.use(cors());
// app.options('*',cors());


//   app.use((req,res,next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();  
//   });

app.use('/Admin', AuthRoute);
app.use('/Confirm', ConfirmRoute);
app.use('/Classes', MiddleWare.AuthAdmin , ClassesRoute);

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
    //console.log(error);
    const StatusCode = Number(JSON.stringify(error).slice(14, 17));
    const message = error.toString().split(':')[1].trim();    
    return res.status(StatusCode).json({
        message : error.toString().split(':')[1].trim()
    })
})
