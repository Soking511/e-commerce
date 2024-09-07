import { Categories } from "./categoriesInterface";
import categoriesModel from "./categoriesModel";
import { DELETE, getAll, getOne, POST, PUT } from "../httpMethods";
import { uploadMultiImages} from "../../middlewares/uploadImages";
import sharp from "sharp";
import { NextFunction, Request, Response } from "express";
import asyncHandler from 'express-async-handler';

export const uploadCategoryImages = uploadMultiImages([{ name: 'cover', maxCount:1 }, { name:'images', maxCount:5}]);
export const resizeCategoryImages = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (req.files) {

    if (req.files.cover) {
      const imgName = `categories-${Date.now()}-cover.webp`;
      await sharp(req.files.cover[0].buffer)
        .resize(500, 500)
        .toFormat('webp')
        .webp({ quality: 95 })
        .toFile(`uploads/categories/${imgName}`)

      req.body.cover = imgName;
    }
    if (req.files.images) {
      req.body.images = [];
      await Promise.all(req.files.images.map(async (image: any, index: number) => {
        const imgName = `categories-${Date.now()}N${index}-.webp`;
        await sharp(image.buffer)
          .toFormat('webp')
          .webp({ quality: 95 })
          .toFile(`uploads/categories/${imgName}`);

        req.body.images.push(imgName);
      }))
    }
  }
  next();
})

export const getAllCategories = getAll<Categories>( categoriesModel, 'category' );
export const getCategoryByID = getOne<Categories>( categoriesModel );
export const createCategory = POST<Categories>( categoriesModel );
export const deleteCategory = DELETE<Categories>( categoriesModel );

export const updateCategory = PUT<Categories>( categoriesModel );
