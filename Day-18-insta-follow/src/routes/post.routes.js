const express= require('express')

const postRouter=express.Router()


const PostController= require('../controllers/post.controller')
const multer=require('multer')
const upload=multer({storage:multer.memoryStorage()})
const identifyUser=require('../middlewares/auth.middlewares')


postRouter.post('/',upload.single('image'),identifyUser,PostController.createPostController)

postRouter.get('/',identifyUser,PostController.getPostController)

postRouter.get('/details/:postId',identifyUser,PostController.getPostDetails)  


// Post /api/posts/like/:postid
// decription: - like a post with the id provide in the parmas
postRouter.post('/like/:postId',identifyUser,PostController.likePostController)


module.exports=postRouter