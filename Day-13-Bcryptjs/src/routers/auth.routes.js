const express = require('express');

const userModel = require('../models/user.model');
const authRouter = express.Router();

const JWT = require('jsonwebtoken');
const crypto = require('crypto');

authRouter.post('/register',async(req,res)=>{
    const {name,email,password} = req.body;
    const UserAlreadyExists = await userModel.findOne({email});
    if(UserAlreadyExists){
        return res.status(409).json({
            message:"Email already exists"

        })
    }
      const hash=crypto.createHash('md5').update(password).digest('hex');
    const user=await userModel.create({
        name,email,password:hash
    })

    const token =JWT.sign({
        id:user._id,
        email:user.email,

    },
    process.env.JWT_SECRET)

    res.cookie('jwtoken',token,)

    res.status(201).json({
        message:"User Registered Successfully",
        user,
        token
    })
})

authRouter.post('/protected',async(req,res)=>{
    console.log(req.cookies);
    res.status(200).json({
        message:"Protected Route Accessed",
       
    })
})


// controller for login route   /api/auth/login
authRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    // check if user exists by email
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).json({
            message:"User not found with this email"
        })

    }
    // check if password matches
    const isPasswordMatch=user.password===crypto.createHash('md5').update(password).digest('hex');
    if(!isPasswordMatch){
        return res.status(401).json({
            message:"Invalid password"
        })
    }
      

    // generate JWT token
    const token=JWT.sign({
        id:user._id,
    },process.env.JWT_SECRET)
    // set token in cookie
    res.cookie('jwtoken',token)

    res.status(200).json({
        message:"Login successful",
        user,
        token
    })
})




module.exports=authRouter;