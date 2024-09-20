import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';
import userModel from "../users/userModel";
import { createResetToken, createToken } from "../../utils/createToken";
import APIErrors from "../../utils/apiErrors";
import { Users } from "../users/userInterface";
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import sendMessageEmail from "../../utils/sendMessageEmail";
import { sanitizeFilter } from "mongoose";

const codeExpireTimeLimit = 10 * 60 * 1000;

export const Register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const currentUser: Users = await userModel.create(req.body);
  const token = createToken(currentUser._id, currentUser.role);
  res.status(201).json({ token, data: currentUser })
});

export const Login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const currentUser = await userModel.findOne({ email: req.body.email });
  if (!currentUser || !(await bcrypt.compare(req.body.password, currentUser.password))) {
    return next(new APIErrors('invalid email or password', 401))
  }

  const token = createToken(currentUser._id, currentUser.role)
  res.status(200).json({ token, data: currentUser })
});

// export const Logout = (req: Request, res: Response) => {
//   res.cookie('jwt', '', {
//     maxAge: 0,
//     httpOnly: true,
//   });
//   res.status(200).json({ message: 'Logged Out Successfully' });
// };

export const protectRoutes = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token: string;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    return next(new APIErrors('please login first', 401))
  }

  const JWTVerify: any = jwt.verify(token, process.env.JWT_KEY!);
  const user = await userModel.findById(JWTVerify._id);
  if (!user) { return next(new APIErrors('User Not Found', 404)) }
  if (user.passwordChangedAt instanceof Date) {
    if (user.passwordChangedAt.getTime()/1000 > JWTVerify.iat) { return next(new APIErrors('Please, login again!', 401)) }
  }
  // req.user = sanitizeUser(user);
  req.user = user;
  next();
});

export const isActive = asyncHandler((req:Request, res:Response, next:NextFunction) =>{
  // return (!req.user?.active&&req.user?.email!=='youseeftareq5176@gmail.com')? next(new APIErrors('You are not active!',403)):next();
  next();
})

export const isHaveAccess = ( ...Roles: string[] ) => {
  return asyncHandler((req: Request, res: Response, next: NextFunction) => {
    // if (!(Roles.includes(req.user?.role!)) && req.user?.email!=='youseeftareq5176@gmail.com') return next(new APIErrors('you are not allowed to access this', 403));
    next();
  })
};

const generateRandomCode = ( ) => { return Math.floor(Math.random() * 900000)};

export const forgetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userModel.findOne( {email:req.body.email} );
  if(!user) return next( new APIErrors( 'Not Found!', 404) );
  const resetCode:string = generateRandomCode().toString()
  if (!resetCode) {
    return next(new APIErrors('Failed to generate reset code', 500));
  }
  user.resetCode = crypto.createHash('sha256').update( resetCode ).digest('hex');
  user.resetCodeExpireTime = Date.now() + (codeExpireTimeLimit); // for 10 min (init in top of current page)
  user.resetCodeVerify = false;
  await user.save();
  const message: string = `Your Reset Password Code is ${resetCode}`;
  try {
    await sendMessageEmail({ email: user.email, subject: 'Reset Password', message });
    await user.save({ validateModifiedOnly: true });
  } catch (err) {
    return next(new APIErrors('error sending email', 400))
  }
  const resetToken: string = createResetToken(user._id);
  res.status(200).json({ message: 'reset password code sent to your email', resetToken })
});

export const checkResetCodeVerification = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let resetToken: string = '';
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    resetToken = req.headers.authorization.split(' ')[1];
  } else {
    return next(new APIErrors(`You Don't Have Reset Code!`, 400))
  }

  const JWTVerify:any = jwt.verify(resetToken, process.env.JWT_KEY!);
  const hashCode:string = crypto.createHash('sha256').update(req.body.resetCode).digest('hex')
  const user = await userModel.findOne({
    _id: JWTVerify._id,
    resetCode: hashCode,
    resetCodeExpireTime: { $gt: Date.now() }
  })
  if (!user) return next(new APIErrors('Invalid or Expired Reset Code', 400));
  user.resetCodeVerify = true;
  await user.save({ validateModifiedOnly: true });
  res.status(200).json({ message: 'Reset Code Verified' });
});

export const applyResetCode = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let resetToken: string = '';
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    resetToken = req.headers.authorization.split(' ')[1];
  } else {
    return next(new APIErrors("you can't do this action", 400));
  }

  const decodedToken: any = jwt.verify(resetToken, process.env.JWT_KEY!);
  const user = await userModel.findOne({
    _id: decodedToken._id,
    resetCodeVerify: true
  })
  if (!user) return next(new APIErrors('Verify Your Reset Code First', 400));
  user.password = req.body.password;
  user.resetCode = undefined!;
  user.resetCodeExpireTime = undefined;
  user.resetCodeVerify = undefined;
  user.passwordChangedAt = Date.now();
  await user.save({ validateModifiedOnly: true });
  res.status(200).json({ message: 'Your Password Has Been Changed' });
});
