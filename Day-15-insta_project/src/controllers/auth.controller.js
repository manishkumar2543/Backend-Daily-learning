
const userModel = require('../models/user.model');
const crypto=require('crypto')
const jwt = require('jsonwebtoken')







async function registerController(req,res){
    const {email,username,password,bio,profileImage}=req.body;
    const isUserExistByEmail= await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserExistByEmail){
        return res.status(409).json({
            message: 'User All reday Exist' + isUserExistByEmail.email === email ? 'Eamil all reday Exist' :
            'Username all redy Exist'
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const user= await userModel.create({
        username,email,bio,profileImage,password:hash
    })

    const token= jwt.sign({
        id: user._id
    },process.env.JWT_SECRETS,{expiresIn: "1d"})

    res.cookie("token",token)

    res.status(201).json({
        message:'Register is Successfull',
        user:{
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

async function loginController(req,res){
    const {email,username,password}=req.body;
    const user= await userModel.findOne({
        $or:[
            {
            username:username
        },
        {
            email:email
        },
        ]
    })
    if(!user){
        return res.status(404).json({
            message:'User not found'
        })
    }

    const hash=crypto.createHash('sha256').update(password).digest('hex')

    const isPasswordVaild= hash == user.password
    if(!isPasswordVaild){
        return res.status(401).json({
            message:'Invaild password'
        })
    }
    const token=jwt.sign({
        id: user._id
    },process.env.JWT_SECRETS)

    res.cookie("token",token)

    res.status(200).json({
        message: 'User login Successfull',
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
    loginController,
}