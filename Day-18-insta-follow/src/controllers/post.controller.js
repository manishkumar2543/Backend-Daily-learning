const postModel=require('../models/post.model')


const ImageKit=require('@imagekit/nodejs')
const {toFile}=require('@imagekit/nodejs')
const jwt =require('jsonwebtoken')

const imagekit= new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
    console.log(req.body,req.file)

    
    

    const file=await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:'Test'
    })

    const post = await postModel.create({
        caption:req.body.caption,
        imgUri:file.url,
        user:req.user.id
    })

    res.status(201).json({
        message:'Post Create Successfull',
        post
    })
    

   

}

async function getPostController(req,res){
   

    
     const userId=req.user.id

     const post=await postModel.find({

        user:userId
     })
     
     res.status(200).json({
        message:'fetch Create Successfull',
        post
        
     })

}

async function getPostDetails(req,res){
  
    const userId=req.user.id
    const postId=req.params.postId

    const post = await postModel.findById(postId)
    if(!post){
        return res.status(404).json({
            message:'Post not found'
        })
    }

    const isVaildUser=post.user.toString() === userId

    if(!isVaildUser){
        return res.status(403).json({
            message:'Forbidden Content'
        })
    }

    res.status(200).json({
        message:'Post fetch Successfull',
        post

    })

}


module.exports={
    createPostController,
    getPostController,
    getPostDetails
}




