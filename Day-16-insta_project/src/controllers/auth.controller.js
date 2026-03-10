const userModel= require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt= require('bcryptjs')



async function registerController(req,res){
    const {username,email,password,bio,profileImage}=req.body;

    const isUserExistByEmail= await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })
    if(isUserExistByEmail){
        return res.status(404).json({
            message: isUserExistByEmail.email === email ? 'Email Allredy Exist' :
            'Username is Allredy Exist'
        })
    }
    const hash=await bcrypt.hash(password,10)
    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password:hash
    })

    const token = jwt.sign({
        id : user._id
    },process.env.JWT_SECRET,{expiresIn: "1d"})

    res.cookie('token',token)

    res.status(201).json({
        message: 'Register Successfull',
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profile: user.profileImage
        }
    })



}

async function loginController(req,res){
    const {username,email,password}=req.body;
    
    const user= await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(!user){
        return res.status(404).json({
            message: 'User not found'
        })
    }

    const isPasswordVaild= await bcrypt.compare(password, user.password)
    if(!isPasswordVaild){
        return res.status(409).json({
            message: 'Invaild password'
        })
    }

    const token= jwt.sign({
        id: user._id
    },process.env.JWT_SECRET)

    res.status(200).json({
        message: "Login Successfull",
        user:{
            username: user.username,
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