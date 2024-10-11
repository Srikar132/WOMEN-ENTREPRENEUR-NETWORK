import { Router } from "express";
import { signup, verifyEmail ,  checkAuth , resetPassword , logout , forgotPassword , login } from "../controllers/auth_controllers.js";
import { forgotPasswordTemplate } from "../mailtrap/email.template.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = Router();

router.get('/check-auth' , verifyToken, checkAuth )
router.post('/signup' , signup);
router.post('/verify-email' , verifyEmail);
router.post('/login' , login)
router.post('/logout' , logout)
router.post('/forgot-password' , forgotPassword)
router.post('/reset-password/:token' , resetPassword) ;
export default router;