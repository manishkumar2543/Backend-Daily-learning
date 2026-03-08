const express=require('express')

const authRouter= express.Router()
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')


authRouter.post('/register',async(req,res)=>{
    const {username,email,password,bio,profileImage}=req.body;

    const isUserEmailByExist= await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    }) 
    if(isUserEmailByExist){
        return res.status(409).json({
            message: isUserEmailByExist.email === email ? "Email Allreday Exist" :
            'Username Allready Exist'
        })
    }

    const user= await userModel.create({
        username,email,password,bio,profileImage
    })

    const token= jwt.sign({
        id: user._id
    },process.env.JWT_SECRETS,{expiresIn: "2d"})

    res.cookie('token',token)

    res.status(201).json({
        message:"Register is Successfull",
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
 
        }
    })
})

authRouter.post('/login',async(req,res)=>{
    const {username,email,password}=req.body;
    const user= await userModel.findOne({
        $or:[
            {username},
            {email},
        ]
    })
    if(!user){
        return res.status(409).json({
            message: 'User not found'
        })
    }
    const isPasswordVaild= password === user.password;
    if(!isPasswordVaild){
        return res.status(409).json({
            message: 'Invaild password'
        })
    }

    const token=jwt.sign({
        id: user._id
    },process.env.JWT_SECRETS)

    res.cookie('token',token)

    res.status(200).json({
        message:'Login Successfull',
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
})


module.exports=authRouter;