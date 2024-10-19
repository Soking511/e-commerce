import { forgetPasswordValidator, loginValidator, registerValidator, resetPasswordValidator } from '../../utils/validators/authValidator';
import { applyResetCode, checkResetCodeVerification, forgetPassword, Login, Register } from './authController';
import { Router } from 'express';

const authRoute: Router = Router()
authRoute.post('/register', registerValidator, Register);
authRoute.post('/login', loginValidator, Login);
authRoute.post('/forgetPassword', forgetPasswordValidator, forgetPassword);
authRoute.post('/verifyCode', checkResetCodeVerification);
authRoute.put('/resetCode', resetPasswordValidator, applyResetCode);
// authRoute.post('/logout', Logout);

export default authRoute;