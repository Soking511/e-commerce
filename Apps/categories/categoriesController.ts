import { Categories } from "./categoriesInterface";
import categoriesModel from "./categoriesModel";
import { DELETE, getAll, getOne, POST, PUT } from "../httpMethods";
import { uploadSingleImage } from "../../middlewares/uploadImages";
import sharp from "sharp";
import { NextFunction, Request, Response } from "express";
import asyncHandler from 'express-async-handler';

export const uploadCategoryImage = uploadSingleImage('cover');
export const resizeCategoryImages = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (req.file) {
    const imgName = `categories-${Date.now()}-.webp`;
    await sharp(req.file.buffer)
      .toFormat('webp')
      .webp({ quality: 95 })
      .toFile(`uploads/categories/${imgName}`);
    req.body.cover = imgName;
  }
  next();
})

export const getAllCategories = getAll<Categories>( categoriesModel, 'category' );
export const getCategoryByID = getOne<Categories>( categoriesModel );
export const createCategory = POST<Categories>( categoriesModel );
export const deleteCategory = DELETE<Categories>( categoriesModel );
export const updateCategory = PUT<Categories>( categoriesModel );
