const express=require('express')


const authRouter=express.Router()

const authController=require('../controllers/auth.controllers')
const idenfyUser=require('../middlewares/auth.middlewares')

authRouter.post('/register',authController.registerController)

authRouter.post('/login',authController.loginController)

authRouter.get('/get-me',idenfyUser,authController.getMeController) 



module.exports=authRouter