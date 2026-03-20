const express= require('express')

const postRouter=express.Router()

const postControll=require('../controllers/post.controllers')
const multer=require('multer')
const upload=multer({storage:multer.memoryStorage()})
const identify=require('../middlewares/auth.middlewares')


postRouter.post('/',upload.single('image'),identify,postControll.createPostController)
postRouter.get('/',identify,postControll.getPostController)

postRouter.get('/details/:postId',identify,postControll.getPostDetailsController)

postRouter.post('/like/:postId',identify,postControll.likePostController)



module.exports=postRouter