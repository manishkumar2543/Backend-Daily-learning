const mongoose=require('mongoose')


const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        default:''
    },
    imgUri:{
        type:String,
        require:[true,'Image Uri is require for creating a post']

    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        require:[true,'User id is require for creating  a post']
    }

})

const postModel=mongoose.model('posts',postSchema)

module.exports=postModel