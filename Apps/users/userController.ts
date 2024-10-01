import { Users } from "./userInterface";
import { DELETE, getAll, getOne, POST, PUT } from "../httpMethods";
import { uploadMultiImages, uploadSingleImage } from "../../middlewares/uploadImages";
import { NextFunction, Request, Response } from "express";
import usersModel from "./userModel";
import sharp from "sharp";
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { createToken } from "../../utils/createToken";

export const uploadUserImage = uploadSingleImage('image');
export const resizeUserImage = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (req.file) {
    const imgName = `Users-${Date.now()}-.webp`;
    await sharp(req.file.buffer)
      .toFormat('webp')
      .webp({ quality: 95 })
      .toFile(`uploads/Users/${imgName}`);
    req.body.image = imgName;
  }
  next();
})

// Manager [Section]

export const getAllUsers = getAll<Users>( usersModel, 'User' );
export const getUserByID = getOne<Users>( usersModel );
export const createUser = POST<Users>( usersModel );
export const deleteUser = DELETE<Users>( usersModel );
export const updateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const updates: Partial<{ name: string; phone: string; image: string; active: boolean }> = {};

  if (req.body.name) updates.name = req.body.name;
  if (req.body.phone) updates.phone = req.body.phone;
  if (req.body.image) updates.image = req.body.image;
  if (req.body.active !== undefined) updates.active = req.body.active;

  const user = await usersModel.findByIdAndUpdate(req.params.id, updates, { new: true });

  res.status(200).json({ data: user });
});


export const changeUserPassword = asyncHandler( async( req:Request, res:Response, next:NextFunction ) => {
  const user = await usersModel.findByIdAndUpdate( req.params.id,{
    password: bcrypt.hash(req.body.password, 13),
    passwordChangedAt: Date.now()
  })
})

// Native User [Section]

export const setUserId = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?._id) req.params.id = req.user._id.toString();
  next();
};

export const updateLoggedUser = asyncHandler( async( req:Request, res:Response, next:NextFunction ) =>{
  const user = await usersModel.findByIdAndUpdate(req.params.id,{
    name: req.body.name,
    phone: req.body.phone,
    image: req.body.image,
  }, {new:true} );
  res.status(200).json({ data:user });
})

export const changeLoggedUserPassword = asyncHandler( async( req:Request, res:Response, next:NextFunction ) => {
  const user = await usersModel.findByIdAndUpdate( req.params.id,{
    password: bcrypt.hash(req.body.password, 13),
    passwordChangedAt: Date.now()
  })
  const token = createToken( user?._id, user?.role! );
  res.status(200).json({ token, data: user });
})