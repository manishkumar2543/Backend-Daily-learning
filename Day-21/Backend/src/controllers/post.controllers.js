
const postModel=require('../models/post.model')
const likeModel=require('../models/like.model')
const ImageKit=require('@imagekit/nodejs')
const {toFile}=require('@imagekit/nodejs')
const jwt=require('jsonwebtoken')


const imagekit=new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
    console.log(req.body,req.file)

    const userId=req.user.id
    console.log(userId)



    const file=await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:'Test',
        folder:'Test'
    })
    

    const post=await postModel.create({
        caption:req.body.caption,
        imgUri:file.url,
        user:userId
    })
    res.status(201).json({
        message:'Post Successful',
        post
    })
}

async function getPostController(req,res){

   const userId=req.user.id

    const post=await postModel.find({
        user:userId
    })
    res.status(200).json({
        message:'Post Fetch Successfull',
        post
    })

}

async function getPostDetailsController(req,res){
   const userId=req.user.id
    const postId=req.params.postId

    const post=await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:'Post not found'
        })
    }
    
    const isVaildUser=post.user.toString()===userId

    if(!isVaildUser){
        return res.status(403).json({
            message:'Forbidden Content'
        })
    }

    res.status(200).json({
        message:'Post Fetch Successfull',
        post
    })

}
async function likePostController(req,res){
    const username=req.user.username
    const postId=req.params.postId

    const post=await postModel.findById(postId)
    if(!post){
        return res.status(404).json({
            message:'Post not found'
        })

    }

    const Alredaylike=await likeModel.findOne({
        post:postId,
        user:username
    })
    if(Alredaylike){
        return res.status(409).json({
            message:'Already Liked'
        })
    }
    
    const like=await likeModel.create({
        post:postId,
        user:username
    })

    res.status(200).json({
        message:'Post like Successfull.',
        like
    })
}

async function feedPostController(req,res){

    const user=req.user
   const post=await Promise.all((await postModel.find().populate('user').lean())

   .map(async(post)=>{

    const isLiked=await likeModel.findOne({
        user:user.username,
        post:post._id
    })
     post.isLiked =Boolean(isLiked)
     return post
   }))
   res.status(200).json({
    message:'Post Fetch Successfull',
    post
   })


}

async function unlikePostController(req,res){
    const username=req.user.username
    const postId=req.params.postId

    const isLiked=await likeModel.findOne({
        post:postId,
        user:username
    })
    if(!isLiked){
        return res.status(404).json({
            message:'Post dont like'
        })
    }
    await likeModel.findByIdAndDelete(isLiked._id)
    res.status(200).json({
        message:'Post unlike Successfull',
        
    })
}


module.exports={
    createPostController,
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    feedPostController,
    unlikePostController
}