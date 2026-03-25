const express=require('express')

const userRouter=express.Router()

const userController=require('../controllers/user.controllers')
const idenfyUser=require('../middlewares/auth.middlewares')


userRouter.post('/follow/:username',idenfyUser,userController.followUserController)

userRouter.post('/unfollow/:username',idenfyUser,userController.unfollowUserController)



module.exports=userRouter