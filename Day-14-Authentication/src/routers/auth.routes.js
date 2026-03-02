const express = require('express');

const AuthRouter=express.Router();

const userModel=require('../models/user.model');

AuthRouter.post('/register',async(req,res)=>{
    const {name,email,password}=req.body;
    const  isUserExists = await userModel.findOne({email})
    if(isUserExists){
        res.status(409).json({
            message:''
        })
    }
    
})

module.exports=AuthRouter;