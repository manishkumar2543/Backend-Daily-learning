const userModel=require('../models/user.model')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


async function registerController(req,res){
    const {username,email,password}=req.body;

    const isAlreadyRegistered=await userModel.findOne({
        $or:[
            {email:email},
            {username:username}
        ]
    })

    if(isAlreadyRegistered){
        return res.status(400).json({
            message:"User already registered"
        })
    }

    const hashedPassword=await bcrypt.hash(password,10)

    const user=await userModel.create({
        username,
        email,
        password:hashedPassword
    })

    const token=jwt.sign({
        id:user._id,
        username:user.username,
       
    },process.env.JWT_SECRET_KEY,{expiresIn:"3d"})

    res.cookie('token',token)

    res.status(201).json({
        message:'User registered successfully',
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
        
    

}

async function loginController(req,res){
    const {username,email,password}=req.body;

    const user=await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })
    if(!user){
        return res.status(400).json({
            message:"User not found"
        })
    }

    const isPasswordValid=await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid password"
        })
    }

    const token=jwt.sign({
        id:user._id,
        username:user.username,
       
    },process.env.JWT_SECRET_KEY,{expiresIn:"3d"})

    res.cookie('token',token)

    res.status(200).json({
        message:'User logged in successfully',
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })


}


module.exports={
    registerController,
    loginController
}