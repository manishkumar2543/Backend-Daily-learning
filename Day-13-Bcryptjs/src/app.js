const express=require('express');
const app=express();
const authRouter=require('./routers/auth.routes');
const cookies=require('cookie-parser');

app.use(express.json());
app.use(cookies());
app.use('/api/auth',authRouter);



module.exports=app;