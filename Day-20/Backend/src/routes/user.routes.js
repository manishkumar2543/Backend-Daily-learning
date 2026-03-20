const express=require('express')

const userRouter=express.Router()

const userControll=require('../controllers/user.controllers')
const identifyUser=require('../middlewares/auth.middlewares')


userRouter.post('/follow/:username',identifyUser,userControll.followUserController)

userRouter.post('/unfollow/:username',identifyUser,userControll.unfollowUserController)



module.exports=userRouter
