export async function registerUser(req,res,next) {
//    try{
//      throw new Error ('encounter an error while  registering new user');
    
//    }
//    catch(err){
//     next(err)
//    }

    // try{
    //     throw new Error("passwrod is to week");
        
    // }
    // catch(err){
    //     err.status = 400
    //     next(err)
    // }

    // user all reday exist

    // try{
    //     throw new Error("user Already Exist with same email");
        
    // }
    // catch(err){
    //     err.status = 409
    //     next(err)
    // }



    res.status(201).json({
        message:"user registered successfully"
    })




}

