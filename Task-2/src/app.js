const express=require('express')
const app=express()
const authRouther=require('../src/routers/auth.routes')
const  cookieParser = require('cookie-parser')
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRouther)




module.exports=app;