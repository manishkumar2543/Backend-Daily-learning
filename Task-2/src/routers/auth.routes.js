const express= require('express')


const authRouther=express.Router()
const jwt=require('jsonwebtoken')
const crypto= require('crypto')

const userModel=require('../models/user.model')


authRouther.post('/register',async(req,res)=>{
    const {name, email, password}=req.body;
    const AllredayExit= await userModel.findOne({email})
    if(AllredayExit){
        return res.status(409).json({
            message:'User All redy Exists'
        })
    }
    const user= await userModel.create({
        name, email, password:crypto.createHash('sha256').update(password).digest('hex'),
    })

    const token= jwt.sign({
        id: user._id
    },process.env.JWT_SECRET,{expiresIn: "1hr"})

    res.cookie("token",token)

    res.status(201).json({
        message: 'Register is Successfull',
        user:{
            name: user.name,
            email:user.email
        }
    })



})

authRouther.get('/get-me',async(req,res)=>{
    const token= req.cookies.token;
    const decoded= jwt.verify(token,process.env.JWT_SECRET)
    const user = await userModel.findById(decoded.id)
    res.json({
            name: user.name,
            email: user.email
    })
})

authRouther.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const user= await userModel.findOne({email})
    if(!user){
        return res.status(404).json({
            message: 'User not Found'
            
        })
    }
        const hash = crypto.createHash('sha256')
                .update(String(password))
                .digest('hex');
        console.log(hash)

     const isPasswordVaild= hash === user.password
     if(!isPasswordVaild){
        return res.status(401).json({
            message: "Invalid password"
        })
     }

     const token= jwt.sign({
        id: user._id
     },process.env.JWT_SECRET,{expiresIn: '1hr'})
     
     res.cookie('token',token);

     res.json({
        message: 'User login is successfull',
        name:user.name,
        email:user.email,
     })
})

 
    




module.exports=authRouther;