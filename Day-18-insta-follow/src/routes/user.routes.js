const express=require('express')

const userRouter=express.Router()

const followControll=require('../controllers/user.controller')
const identifyUser=require('../middlewares/auth.middlewares')




// Post /api/users/follow/userid
//  description- follow  a user
// access private
userRouter.post('/follow/:username',identifyUser,followControll.followUserController)



module.exports=userRouter;