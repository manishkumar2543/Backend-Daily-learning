const mongoose=require('mongoose')

const postSchema= new mongoose.Schema({
    caption:{
        type:String,
        default:''
    },
    Img_Url:{
        type:String,
        require: [true,'ImgUri is required for creating an post'],
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:[true,'User id is require for creating an post']
    }

})

const postModel=mongoose.model('posts',postSchema)

module.exports=postModel