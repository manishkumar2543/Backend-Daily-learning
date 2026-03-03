const express = require('express');
const app=express();
const AuthRouter=require('./routers/auth.routes');
const  cookieParser = require('cookie-parser')
app.use(express.json());
app.use(cookieParser())

app.use('/api/auth',AuthRouter);


module.exports=app;