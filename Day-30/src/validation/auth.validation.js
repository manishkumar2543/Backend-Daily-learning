import { body,validationResult } from "express-validator";
const validate=(req,res,nex)=>{
    const errors=validationResult(req);
    if(errors.isEmail()){
        return nex()
    }
    res.status(400).json({
        errors:errors.array()
    })
}

export const registerValidation=
[
   
    body("username").isString().withMessage("username must be string"),
    body("email").isEmail().withMessage("email must be valid"),
     body("password").isLength({min:4,max:12}).withMessage("password must be 4 to 12 character long"),

    validate
   
]