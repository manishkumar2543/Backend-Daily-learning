const express=require('express');
const autherRouter=require('./Routes/auth.routes');
const cookieParser=require('cookie-parser');
const app=express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',autherRouter);

module.exports=app;