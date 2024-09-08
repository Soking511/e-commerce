import { Users } from "./userInterface";
import usersModel from "./userModel";
import { DELETE, getAll, getOne, POST, PUT } from "../httpMethods";
import { uploadMultiImages} from "../../middlewares/uploadImages";
import sharp from "sharp";
import { NextFunction, Request, Response } from "express";
import asyncHandler from 'express-async-handler';

export const uploadUserImages = uploadMultiImages([{ name: 'cover', maxCount:1 }, { name:'images', maxCount:5}]);
export const resizeUserImages = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (req.files) {

    if (req.files.cover) {
      const imgName = `Users-${Date.now()}-cover.webp`;
      await sharp(req.files.cover[0].buffer)
        .resize(500, 500)
        .toFormat('webp')
        .webp({ quality: 95 })
        .toFile(`uploads/Users/${imgName}`)

      req.body.cover = imgName;
    }
    if (req.files.images) {
      req.body.images = [];
      await Promise.all(req.files.images.map(async (image: any, index: number) => {
        const imgName = `Users-${Date.now()}N${index}-.webp`;
        await sharp(image.buffer)
          .toFormat('webp')
          .webp({ quality: 95 })
          .toFile(`uploads/Users/${imgName}`);

        req.body.images.push(imgName);
      }))
    }
  }
  next();
})

export const getAllUsers = getAll<Users>( usersModel, 'User' );
export const getUserByID = getOne<Users>( usersModel );
export const createUser = POST<Users>( usersModel );
export const deleteUser = DELETE<Users>( usersModel );

export const updateUser = PUT<Users>( usersModel );
