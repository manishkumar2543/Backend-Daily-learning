
const jwt =require('jsonwebtoken')

async function identify(req,res,next){
        const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            message:'Token not provided,Uanthroized access'
        })
    }

    let decoded;
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(err){
        return res.status(401).json({
            message:'Uanthroized access'
        })
    }

    req.user=decoded

    next()
}

module.exports=identify