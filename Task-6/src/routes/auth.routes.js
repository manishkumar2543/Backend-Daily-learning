const express=require('express')

const authRouter=express.Router()

const authControll=require('../controllers/auth.controller')



authRouter.post('/register',authControll.registerController)
authRouter.post('/login',authControll.loginController)

module.exports=authRouter