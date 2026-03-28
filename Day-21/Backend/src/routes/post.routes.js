const express=require('express')

const postRouter=express.Router()

const postController=require('../controllers/post.controllers')
const multer=require('multer')
const upload=multer({storage:multer.memoryStorage()})
const idenfyUser=require( '../middlewares/auth.middlewares')

postRouter.post('/',upload.single('image') ,idenfyUser,postController.createPostController)
postRouter.get('/', idenfyUser,postController.getPostController)
postRouter.get('/details/:postId ',idenfyUser,postController.getPostDetailsController)
postRouter.post('/like/:postId',idenfyUser,postController.likePostController)

postRouter.get('/feed',idenfyUser,postController.feedPostController)
postRouter.post('/unlike/:postId',idenfyUser,postController.unlikePostController)



module.exports=postRouter