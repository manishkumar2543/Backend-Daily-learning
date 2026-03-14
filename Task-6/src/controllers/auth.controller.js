
const userModel=require('../models/user.model')
const bcrypt= require('bcryptjs')
const jwt =require('jsonwebtoken')



async function registerController(req,res){
    const {username,email,password,bio,profileImage}=req.body;

    const isEmailbyUserExist= await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isEmailbyUserExist){
        return res.status(409).json({
            message:isEmailbyUserExist.email === email ? 'Email Allreday Exist' :
            'Username Allredy Exsit'
        })
    }


    const hash=await bcrypt.hash(password,10)
    const user=await userModel.create({
        username,
        password:hash,
        email,
        bio,
        profileImage
    })

    const token= jwt.sign({
        id: user._id
    },process.env.JWT_SECRET)

    res.cookie('token',token)

    res.status(201).json({
        message:'Rigister Successful',
        user:{
            username: user.username,
            email: user.email,
            bio:user.bio,
            profileImage: user.profileImage
        }
    })



}


async function loginController(req,res){
    const {username,email,password}=req.body;

    const user=await userModel.findOne({
        $or:[
            {username:username},
            {email:email}
        ]
    })

    if(!user){
        return res.status(404).json({
            message:'User not found'
        })
    }

    const isPasswordVaild=await bcrypt.compare(password, user.password)
    if(!isPasswordVaild){
        return res.status(401).json({
            message:'Invaild password'
        })
    }
    
    const token= jwt.sign({
        id: user._id
    },process.env.JWT_SECRET,{expiresIn:'1d'})

    res.cookie('token',token)

    res.status(200).json({
        message:'Login Successfull',
        user:{
            username:user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
    

}

module.exports={
    registerController,
    loginController
}