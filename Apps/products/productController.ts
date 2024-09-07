import { NextFunction, Request, Response } from "express";
import Product from "./productInterface";
import asyncHandler from 'express-async-handler';
import productModel from "./productModel";
import { getAll, getOne, POST, DELETE, PUT } from "../httpMethods";
import { uploadMultiImages } from "../../middlewares/uploadImages";
import sharp from 'sharp';

// const upload = multer({dest:'./uploads'}) // to create folder for One Time

export const uploadProductImages = uploadMultiImages([{ name: 'cover', maxCount:1 }, { name:'images', maxCount:5}]);
export const resizeProductImages = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (req.files) {

    if (req.files.cover) {
      const imgName = `product-${Date.now()}-cover.webp`;
      await sharp(req.files.cover[0].buffer)
        .resize(500, 500)
        .toFormat('webp')
        .webp({ quality: 95 })
        .toFile(`uploads/products/${imgName}`)

      req.body.cover = imgName;
    }
    if (req.files.images) {
      req.body.images = [];
      await Promise.all(req.files.images.map(async (image: any, index: number) => {
        const imgName = `product-${Date.now()}N${index}-.webp`;
        await sharp(image.buffer)
          .toFormat('webp')
          .webp({ quality: 95 })
          .toFile(`uploads/products/${imgName}`);

        req.body.images.push(imgName);
      }))
    }
  }
  next();
})

export const getAllProducts = getAll<Product>( productModel, 'product' );
export const getProductByID = getOne<Product>( productModel );
export const createProduct = POST<Product>( productModel );
export const deleteProduct = DELETE<Product>( productModel  );
export const updateProduct = PUT<Product>( productModel );