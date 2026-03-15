const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        unique:[true, 'Username Allready Exit'],
        require:[true,'Username name require']
        
    },
    email:{
        type:String,
        unique:[true,'Eamil Allready Exit'],
        require:[true,'Eamil is require']

    },
    password:{
        type:String,
        require:[true, 'password require']
    },
    bio:{
        type:String,
    
    },
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/9xmdsgbfi/download.jpeg"
    },

    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],

    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],



})


const userModel=mongoose.model('user',userSchema)

module.exports=userModel