const userModel=require('../models/user.model')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs');
const blacklistModel = require('../models/blacklist.model');
const redis=require('../config/cache')



async function registerUser(req,res){
    const {username,email,password}=req.body;
    const isUserExistsByEmail=await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })
    if(isUserExistsByEmail){
        return res.status(400).json({
            message:'User allready Exist '
        })
    }

    const hashedPassword =await bcrypt.hash(password,10)

    const user=await userModel.create({
        username,
        email,
        password:hashedPassword
    })

    const token=jwt.sign({
        id:user._id,
        username: user.username
        
    },process.env.JWT_SECRET,{expiresIn:'3d'})
    res.cookie("token",token)

    res.status(201).json({
        message:'Rigister successfull',
        user
    })
}

async function loginUser(req,res){
    const {username,email,password}=req.body;

    const user=await userModel.findOne({
        $or:[
            {username},
            {email}

        ]
    }).select('+password')
    if(!user){
        return res.status(400).json({
            message:'user not found'
        })
    }
    const isPasswordValid=await bcrypt.compare(password,user.password)
    
    if(!isPasswordValid){
        return res.status(400).json({
            message:'Invalid password'
        })
    }

    const token=jwt.sign({
        id: user._id,
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:'3d'})

    res.cookie('token',token)

    
res.status(200).json({
        message:'Login successfull',
        user
    })

}

async function getMe(req,res){
    
    const user=await userModel.findById(req.user.id)
    
    res.status(200).json({
        message:'fetching successfull',
        user

    })
}

async function logoutUser(req,res){
    const token=req.cookies.token

    res.clearCookie('token')
    await redis.set(token,Date.now().toString()   )

    res.status(200).json({
        message:'Logout successfully'
    })
}
module.exports={
    registerUser,
    loginUser,
    getMe,
    logoutUser
}