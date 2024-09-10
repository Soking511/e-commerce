import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';
import userModel from "../users/userModel";
import { createToken } from "../../utils/createToken";
import APIErrors from "../../utils/apiErrors";
import { Users } from "../users/userInterface";
import jwt from "jsonwebtoken";

export const Register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const currentUser: Users = await userModel.create(req.body);
  const token = createToken(currentUser._id, currentUser.role);
  res.cookie('jwt', token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
  });
  res.status(201).json({ token, data: currentUser })
});

export const Login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const currentUser = await userModel.findOne({ email: req.body.email });
  if (!currentUser || !(await bcrypt.compare(req.body.password, currentUser.password))) {
    return next(new APIErrors('invalid email or password', 401))
  }
  const token = createToken(currentUser._id, currentUser.role)
  res.cookie('jwt', token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
  });
  res.status(200).json({ token, data: currentUser })
});

export const Logout = (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    maxAge: 0,
    httpOnly: true,
  });
  res.status(200).json({ message: 'Logged Out Successfully' });
};

export const protectRoute = async( req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  if ( !token )
    return next(new Error( 'You are not logged in!' ))

  const verifyJWT = jwt.verify(token, process.env.JWT_SECRET!);
  if ( !verifyJWT )
    return next(new Error( 'Invalid token, Please log in' ));
    //
    //

};
