
// function handleError(err,req,res,next){
//     res.status(err.status).json({
//         message:err.message
//     })
// }

// Stack Trace - Error kis line pe hai
// function handleError(err,req,res,next){
//     res.status(err.status).json({
//         message:err.message,
//         stack:err.stack

//     })
// }

import dontenv from 'dotenv'
// jis file me dotenv ko import krenge sirf vhi use hoga
dontenv.config()
function handleError(err,req,res,next){
   const response={
     message:err.message
   }
   if(process.env.NODE_ENVIRONMENT === 'development'){
        response.stack=err.stack
    
   }
   res.status(err.status).json(response)

}






export default handleError