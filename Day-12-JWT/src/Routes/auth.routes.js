const express=require('express');

const userModel=require('../models/user.model');
const jwt=require('jsonwebtoken');

const autherRouter=express.Router();

autherRouter.post('/register',async(req,res)=>{
    
    const {name,email,password}=req.body;
    const isUserAlreadyExit= await userModel.findOne({email});
    if(isUserAlreadyExit){
        return res.status(400).json({
            message:'User already exists'
        })
    }

    const user= await userModel.create({
        name,email,password

    })
    const token=jwt.sign({
        id:user._id,
        name:user.name,
        email:user.email

    },
    process.env.JWT_SECRET_KEY,
)
    res.cookie('jwt_token',token)

    res.status(201).json({
        message:'User registered successfully',
        user,
        token
    })


})


module.exports=autherRouter;