const path = require('path');
const express = require('express');
const userRoute  =require('./routes/user')
const mongoose = require('mongoose');
const cookieParser  = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middleware/authentication');
 
const app = express();
const port = 8000;

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({extended:false}))

mongoose.connect('mongodb://localhost:27017/blogify').then(e =>{
    console.log("mongo connected");
})

app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get('/', (req,res)=>{
    res.render('home',{
        user:req.user
    });
    
})

app.use("/user",userRoute)

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})