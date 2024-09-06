import { NextFunction, Request, Response } from "express";
import Product from "./productInterface";
import ProductsModel from "./productModel";
import asyncHandler from 'express-async-handler';
import productModel from "./productModel";
import mongoose from "mongoose";
import { getAll, getOne, POST, DELETE, PUT } from "../httpMethods";
import multer from 'multer';
import { uploadMultiImages } from "../../middlewares/uploadImages";
import sharp from 'sharp';

export const uploadProductImages = uploadMultiImages([{ name: 'cover', maxCount:1 }, { name:'images', maxCount:5}]);
export const resizeProductImages = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (req.files) {
    if (req.files.cover) {
      const imgName = `product-cover-${Date.now()}-.webp`
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
        const imgName = `product-photo-${Date.now()}N${index}-.webp`;
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


export const getAllProductsFromSubcategory = asyncHandler( async ( req:Request, res: Response, next: NextFunction )  => {
  let subcategoryID = req.params.id;

  if (!subcategoryID || !mongoose.Types.ObjectId.isValid(subcategoryID)){
    res.status(204).json();
    return;
  }

  const filter = { subcategoryID };
  const SubcategoryProducts: Product[] | null  = await ProductsModel.find(filter);
  res.status(200).json( {data:SubcategoryProducts} );
} )

export const getAllProducts = getAll<Product>( productModel, 'product' );
export const getProductByID = getOne<Product>( productModel );
export const createProduct = POST<Product>( productModel );
export const deleteProduct = DELETE<Product>( productModel  );
export const updateProduct = PUT<Product>( productModel );