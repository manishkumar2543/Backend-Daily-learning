const mongoose= require('mongoose')

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        unique:[true,'User name Allreday Exist'],
        require:[true, 'User name is required']
    },
    email:{
        type: String,
        unique:[true,'Email All ready Exist'],
        require:[true, 'User email is  required']
    },
    password:{
        type:String,
        require:[true, 'password is required']
    },
    bio:String,
    profileImage:{
        type:String,
        default:'https://ik.imagekit.io/9xmdsgbfi/download.jpeg'
    }

})

const userModel=mongoose.model('User',userSchema);

module.exports=userModel;