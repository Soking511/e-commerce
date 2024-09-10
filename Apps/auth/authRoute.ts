import { loginValidator, registerValidator } from '../../utils/validators/authValidator';
import { Login, Logout, Register } from './authController';
import { Router } from 'express';

const authRoute: Router = Router()
authRoute.post('/register', registerValidator, Register);
authRoute.post('/login', loginValidator, Login);
authRoute.post('/logout', Logout);

export default authRoute;