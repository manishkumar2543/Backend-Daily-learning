const express = require('express');
const app=express();
const AuthRouter=require('./routers/auth.routes');
app.use(express.json());
app.use('/api/auth',AuthRouter);


module.exports=app;