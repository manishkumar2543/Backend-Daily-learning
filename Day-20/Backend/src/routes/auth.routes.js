const express= require('express')

const authRouter=express.Router()

const authController=require('../controllers/auth.controllers')
const identify=require('../middlewares/auth.middlewares')


authRouter.post('/register',authController.registerController)

authRouter.post('/login',authController.loginController)

authRouter.get('/get-me',identify,authController.getMeController)


module.exports=authRouter