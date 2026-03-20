const mongoose=require('mongoose')


const userSchema= new mongoose.Schema({
    username:{
        type:String,
        unique:[true, 'Username Already Exist'],
        require:[true,'Username is require']

    },
    email:{
        type:String,
        unique:[true,'Email Already Exist'],
        require:[true, 'Email is require']
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

const userModel=mongoose.model('user',userSchema);

module.exports=userModel