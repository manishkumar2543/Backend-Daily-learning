const mongoose=require('mongoose')

const postSchema= new mongoose.Schema({
    caption:{
        type:String,
        default:''
    },
    imgUri:{
        type:String,
        require:[true,'Image uri is require for creating an post']
    },

    user:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        require:[true,'User id is require for creating and post']
    }
    
})

const postModel=mongoose.model('posts',postSchema)

module.exports=postModel