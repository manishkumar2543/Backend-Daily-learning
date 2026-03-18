const mongoose=require('mongoose')

const postSchema= new mongoose.Schema({
    caption:{
        type:String,
        default:''
    },
    imgUri:{
        type:String,
        require:[true,'Image Uri is require for crating an post']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:[true, 'User id  is require ']

    }
})
const postModel= mongoose.model('posts',postSchema)

module.exports=postModel