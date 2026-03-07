const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        unique:[true,'Usernmae is Allreday Exist'],
        require:[true,'Usernmae is required']

    },
    email:{
        type:String,
        unique:[true,'Email Allreday Exist'],
        require:[true,'Email is require']
    },
    password:{
        type:String,
        require:[true,'password is require']
    },
    bio:{
        type:String
    },
    profileImage:{
        type:String,
        default:'https://ik.imagekit.io/9xmdsgbfi/download.jpeg',
    }

})

const userModel=mongoose.model('User',userSchema)

module.exports=userModel;