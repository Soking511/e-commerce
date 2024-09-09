import { Users } from "./userInterface";
import { DELETE, getAll, getOne, POST, PUT } from "../httpMethods";
import { uploadMultiImages } from "../../middlewares/uploadImages";
import { NextFunction, Request, Response } from "express";
import usersModel from "./userModel";
import sharp from "sharp";
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
export const uploadUserImage = uploadMultiImages([{ name: 'cover', maxCount:1 }, { name:'images', maxCount:5}]);
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

export const getAllUsers = getAll<Users>( usersModel, 'User' );
export const getUserByID = getOne<Users>( usersModel );
export const createUser = POST<Users>( usersModel );
export const deleteUser = DELETE<Users>( usersModel );
export const updateUser = asyncHandler( async( req:Request, res:Response, next:NextFunction ) =>{
  const user = await usersModel.findByIdAndUpdate(req.params.id,{
    name: req.body.name,
    phone: req.body.phone,
    image: req.body.image,
    active: req.body.active
  }, {new:true} );
  res.status(200).json({ data:user });
})

export const changeUserPassword = asyncHandler( async( req:Request, res:Response, next:NextFunction ) => {
  const user = await usersModel.findByIdAndUpdate( req.params.id,{
    password: bcrypt.hash(req.body.password, 13),
    passwordChangedAt: Date.now()
  })
})