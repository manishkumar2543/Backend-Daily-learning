const express=require('express')

const authRouter=express.Router()
const userModel=require('../models/user.model');
const crypto=require('crypto')
const jwt=require('jsonwebtoken')


authRouter.post('/register',async(req,res)=>{
    const {username,email,bio,profileImage,password}=req.body;

    const isUserEmailByExist=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserEmailByExist){
        return res.status(409).json({
            message: isUserEmailByExist.email === email ? "Email Allready Exist" : 
            "Username is Allreday Exist"
        })
    }

    const hash=crypto.createHash('sha256').update(password).digest('hex')
    
    const user= await userModel.create({
        username,email,bio,profileImage,password:hash
    })

    const token=jwt.sign({
        id: user._id
    },process.env.JWT_SECRET,{expiresIn:'1d'})

    res.cookie('token',token)

    res.status(201).json({
        message: 'Register is Successfull',
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage:user.profileImage
        }
    })
})

authRouter.post('/login', async(req,res)=>{
    const {email,username,password}=req.body;
    const user= await userModel.findOne({
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

    const hash= crypto.createHash('sha256').update(password).digest('hex')
    
    const isPasswordVaild= hash === user.password

    if(!isPasswordVaild){
        return res.status(409).json({
            message: 'Invaild password'
        })
    }

    const token= jwt.sign({
        id: user._id
    },process.env.JWT_SECRET)

    res.cookie('token',token)

    res.status(200).json({
        message: 'Login is Successfull',
        user:{
            username:user.username,
            email:user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })


})

module.exports=authRouter;