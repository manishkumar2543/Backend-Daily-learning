const express = require('express');

const AuthRouter=express.Router();
const crypto=require('crypto')
const jwt =require('jsonwebtoken')
const cookieParser= require('cookie-parser')
const userModel=require('../models/user.model');


AuthRouter.post('/register',async(req,res)=>{
    const {name,email,password}=req.body;
    const  isUserExists = await userModel.findOne({email})
    if(isUserExists){
        res.status(409).json({
            message:" User All reay Exit"
        })
        
    }
    const user= await userModel.create({
        name, email, password:crypto.createHash('sha256').update(password).digest('hex')
    })
    const token= jwt.sign({
        id: user._id
    },process.env.JWT_SECRETS, {expiresIn: '1hr'})

    res.cookie('token',token)
    
    res.status(201).json({
        message: "user register successfull",
        user: {
            name: user.name,
            email: user.email,
        },
    })
})

AuthRouter.get('/get-me',async (req,res)=>{
    const token= req.cookies.token
   const decoded= jwt.verify(token,process.env.JWT_SECRETS)
 
   const user = await userModel.findById(decoded.id)
   res.json({
    name: user.name,
    email:user.email,
   })
})

AuthRouter.post('/login',async (req,res)=>{
    
    const {email, password}= req.body;
   
    const user= await userModel.findOne({email})


    if(!user){
       return res.status(404).json({
            message: "User not found"
        })
    }
     const hash = crypto.createHash('sha256')
        .update(String(password))
        .digest('hex');

    


    const isPasswordVaild= hash === user.password
    if(!isPasswordVaild){
        return res.status(404).json({
            message:"Invaild password"
        })
    }
    const token=jwt.sign({
        id: user._id,
    },process.env.JWT_SECRETS, {expiresIn: "1hr"})
    
    res.cookie("token",token)

    res.json({
        message: "User logged in successfull",
        user:{
            name:user.name,
            email: user.email,
        }
    })

})




module.exports=AuthRouter;