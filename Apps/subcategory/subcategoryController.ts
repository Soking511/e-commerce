import { Subcategories } from "./subcategoryInterface";
import { DELETE, getAll, getOne, POST, PUT } from "../httpMethods";
import subcategoryModel from "./subcategoryModel";
import { FilterData } from "../moreInterfaces/filterData";
import sharp from "sharp";
import { NextFunction, Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import { uploadMultiImages } from "../../middlewares/uploadImages";

export const uploadProductImages = uploadMultiImages([{ name: 'cover', maxCount:1 }, { name:'images', maxCount:5}]);
export const resizeProductImages = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (req.files) {

    if (req.files.cover) {
      const imgName = `subcategories-${Date.now()}-cover.webp`;
      await sharp(req.files.cover[0].buffer)
        .resize(500, 500)
        .toFormat('webp')
        .webp({ quality: 95 })
        .toFile(`uploads/subcategories/${imgName}`)

      req.body.cover = imgName;
    }
    if (req.files.images) {
      req.body.images = [];
      await Promise.all(req.files.images.map(async (image: any, index: number) => {
        const imgName = `subcategories-${Date.now()}N${index}-.webp`;
        await sharp(image.buffer)
          .toFormat('webp')
          .webp({ quality: 95 })
          .toFile(`uploads/subcategories/${imgName}`);

        req.body.images.push(imgName);
      }))
    }
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