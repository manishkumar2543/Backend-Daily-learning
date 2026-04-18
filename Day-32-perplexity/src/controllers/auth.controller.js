import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";  

import bcrypt from "bcryptjs";

export async function register(req, res) {
  const { username, email, password } = req.body;

  const isUserAlreadyExist= await userModel.findOne({
    $or:[
      {email},
      {username}
    ]
  })
  if(isUserAlreadyExist){
    return res.status(400).json({
      message:'User already exist with this email or username',
      success:false,
      err:'User alredy exist'
      
    })
  }
  const user= await userModel.create({
    username,
    email,
    password
  })

  const emailVerficationToken= jwt.sign({
    email:user.email
  },process.env.JWT_SECRET)

  await sendEmail({
    to:email,
    subject:'Welcome to perplexity',
    html:`Hi ${username},
    <h1>Welcome to perplexity</h1>
    <p>Click <a href="http://localhost:5000/api/auth/verify-email?token=${emailVerficationToken}">here</a> to verify your email</p>
    <p>Thank you for registering with us. We are excited to have you on board!</p>
    <p>Best regards,<br/>The Perplexity Team</p>
    `
  })
  res.status(201).json({
    message:'User registered successfully',
    success:true,
    user:{
      id:user._id,
      username:user.username,
      email:user.email
    }
  })
}

export async function emailVerify(req,res){
  const {token}= req.query;

  try{
      const decoded=jwt.verify(token,process.env.JWT_SECRET);
 
   const user=await userModel.findOne({
    email:decoded.email
   })
   if(!user){
    return res.status(400).json({
      message:'Invalid token',
      success:false,
      err:'User not found'
    })
   }
   user.verified=true;
   await user.save();
   const html=`
    <h1>Email verified successfully</h1>
    <p>Your email has been successfully verified. You can now log in to your account and start using our services.</p>
    <a href="http://localhost:5000/login">Go to Login</a>
   

   `
   res.send(html)

  }catch(err){
    return res.status(400).json({
      message:"Invalid expired token",
      success:false,
      err:'Invalid token'

    })
  }

  

}

export async function login(req,res){
  const {email,password}= req.body;
  const user=await userModel.findOne({email})
  if(!user){
    return res.status(400).json({
      message:'User not found',
      success:false,
      err:'User not found'
    })
  }
  const isPasswordMatch= await bcrypt.compare(password,user.password);
  if(!isPasswordMatch){
    return res.status(400).json({
      message:'Invalid password',
      success:false,
      err:'Invalid password'
    })
  }
  if(!user.verified){
    return res.status(400).json({
      message:'Please verify your email before logging in',
      success:false,
      err:'Email not verified'
    })
  }
  const token= jwt.sign({
    id:user._id,
    username:user.username,
   
  },process.env.JWT_SECRET,{
    expiresIn:'7d'
  })
  res.cookie('token',token)

  res.status(200).json({
    message:'Login successful',
    success:true,
    user:{
      id:user._id,
      username:user.username,
      email:user.email
    }

  })
} 

export async function getMe(req,res){
  const userId= req.user.id;
  const user=await userModel.findById(userId).select('-password');
  if(!user){
    return res.status(400).json({
      message:'User not found',
      success:false,
      err:'User not found'
    })
  }
  res.status(200).json({
    message:'User fetched successfully',
    success:true,
    user
  })
}

