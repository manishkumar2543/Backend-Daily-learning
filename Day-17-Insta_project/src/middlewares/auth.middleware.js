
const jwt =require('jsonwebtoken')
async function identifyUser(req,res,next){
     
       const token =req.cookies.token;
    
        if(!token){
            return res.status(401).json({
                message: "Token not provid, Unauthorized access"
            })
        }
    
        let decoded=null
    
        try{
             decoded = jwt.verify(token,process.env.JWT_SECRET)
        }
        catch(err){
            return res.status(401).json({
                message:'user not authroized'
            })
    
        }
    
    // user ke id ko save kr diye (req.user) me
        req.user=decoded

        // next() ye kam krta h reqest ko age forward krta hai

        next()


}

module.exports=identifyUser