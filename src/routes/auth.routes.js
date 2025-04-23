import { Router } from "express";
import { registerUser,loginUser,verifyEmail,forgotPasswordRequest,ChangeCurrentPassowrd,refreshAcessToken,resendEmailVerification,logoutUser,getCurrentUser } from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import { UserRegistrationValidator } from "../validators/indexval.js";
import {isLoggedin} from "../middlewares/auth.middleware.js"

const router = Router();

// router.route('/register').post(UserRegistrationValidator(), validate, registerUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser)
router.route("/verifyemail/:token").get(verifyEmail)
router.route("/me").get(isLoggedin,getCurrentUser)
router.route("/logout").get(isLoggedin,logoutUser);
router.route("/forgotpassword").post(forgotPasswordRequest)
router.route("/reset-password/:token").post(ChangeCurrentPassowrd)

export default router;