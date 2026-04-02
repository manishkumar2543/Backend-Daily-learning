const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        unique:[true,'Username allready exist'],
        require:[true,'Username require']
    },
    email:{
        type:String,
        unique:[true,'Email allready exist'],
        require:[true,'Email require']
    },
    password:{
        type:String,
        require:[true,'Password require'],
        select:false
        
    }
})

const userModel=mongoose.model('user',userSchema);
module.exports=userModel    