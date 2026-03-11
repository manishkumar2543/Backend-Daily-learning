const express= require('express')

const postRouter=express.Router()

const postController=require('../controllers/auth.controller')
const multer= require('multer')

const upload = multer({storage:multer.memoryStorage()})

postRouter('/',upload.single("image"),postController)