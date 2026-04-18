import { Router } from "express";
import { emailVerify, getMe, login, register } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { authUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerValidator, register);

// @route post /api/auth/login
// @desc login user and  return token
// @access public
// @body {email,password}
router.post("/login",loginValidator,login)


// @routes` get /api/auth/verify-email?token=
// @desc verify email of user
// @access public
router.get("/verify-email", emailVerify);


// @routes` get /api/auth/get-me
// @desc get details of logged in user
// @access private

router.get('/get-me',authUser,getMe)


export default router;
