const mongoose= require('mongoose')

const postSchema= new mongoose.Schema({
    caption:{
        type:String,
        default: ''
    },
    imgUri:{
        type:'String',
        require:'Image is require for creating an post'
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        require:[true,'User id  required for creating an post']
    }
    
})

const postModel= mongoose.model('posts',postSchema)

module.exports=postModel