const mongoose=require('mongoose')


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,'Username Exist'],
        require:[true,'Username require']
    },
    email:{
        type:String,
        unique:[true,'Email Allready Exist'],
        require:[true,'Email require']
    },
    password:{
        type:String,
        require:[true,'password require']
    },
    bio:{
        type:String
    },
    profileImage:{
        type:String,
        default:'https://ik.imagekit.io/9xmdsgbfi/download.jpeg'
    }



})

const userModel= mongoose.model("User",userSchema)

module.exports=userModel;