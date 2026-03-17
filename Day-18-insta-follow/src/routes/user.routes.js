const express=require('express')

const userRouter=express.Router()

const userControll=require('../controllers/user.controller')
const identifyUser=require('../middlewares/auth.middlewares')




// Post /api/users/follow/userid
//  description- follow  a user
// access private
userRouter.post('/follow/:username',identifyUser,userControll.followUserController)


// Post /api/users/unfollow/username
// description :- Unfollow a User
userRouter.post('/unfollow/:username',identifyUser,userControll.unfollowUserController)



module.exports=userRouter;