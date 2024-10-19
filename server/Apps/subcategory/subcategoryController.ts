import { Subcategories } from "./subcategoryInterface";
import { DELETE, getAll, getOne, POST, PUT } from "../httpMethods";
import subcategoryModel from "./subcategoryModel";
import { FilterData } from "../moreInterfaces/filterData";
import sharp from "sharp";
import { NextFunction, Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import { uploadMultiImages, uploadSingleImage } from "../../middlewares/uploadImages";

export const uploadSubcategoryImage = uploadSingleImage('cover');
export const resizeSubcategoryImages = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (req.file) {
    const imgName = `subcategory-${Date.now()}-.webp`;
    await sharp(req.file.buffer)
      .toFormat('webp')
      .webp({ quality: 95 })
      .toFile(`uploads/subcategory/${imgName}`);
    req.body.cover = imgName;
  }
  next();
})

export const filterSubcategories = (req: Request, res: Response, next: NextFunction) => {
  let filterData: FilterData = {};
  if (req.params.categoryId) {
    filterData.category = req.params.categoryId;
  }
  req.filterData = filterData;
  next();
}

export const getAllSubcategories = getAll<Subcategories>( subcategoryModel, 'subcategory' );
export const getSubcategoryByID = getOne<Subcategories>( subcategoryModel );
export const createSubcategory = POST<Subcategories>( subcategoryModel );
export const deleteSubcategory = DELETE<Subcategories>( subcategoryModel );
export const updateSubcategory = PUT<Subcategories>( subcategoryModel );