const userModel= require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt= require('bcryptjs')


async function registerController(req,res){
    const {username,password,email,bio,profileImage}=req.body

    const isUserByEmailExist=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserByEmailExist){
        return res.status(404).json({
            message: isUserByEmailExist.email === email ? 'Email Allready Exist' :
            'User Allreday Exist'
        })
    }
        const hash= await bcrypt.hash(password,10)

    const user= await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profileImage,
        password:hash
    })

    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET)


    res.cookie('token',token)

    res.status(201).json({
        message: "Register Successfull",
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
        
    })
    
}


async function loginController(req,res){
    const {email,password,username}=req.body;

    const user = await userModel.findOne({
        $or:[
            {username:username},
            {email: email}

        ]

    })

     if(!user){
    return res.status(404).json({
        message:'User not found'
    })
  }
 const isPasswordVaild= await bcrypt.compare(password, user.password)

 if(!isPasswordVaild){
    return res.status(409).json({
        message: 'Invaild password'
    })
 }
 const token=jwt.sign({
    id: user._id
 },process.env.JWT_SECRET,{expiresIn:"1d"})

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

}

module.exports={
    registerController,
    loginController
}