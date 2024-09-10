import { Router } from 'express';
import { loginValidator, registerValidator } from '../../utils/validators/authValidator';
import { Login, Register } from './authController';

const authRoute: Router = Router()
authRoute.post('/register', registerValidator, Register);
authRoute.post('/login', loginValidator, Login);

export default authRoute;